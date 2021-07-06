import {
  OwnershipTransferred,
  SwapFilled,
  SwapPairRegister,
  SwapStarted
} from "../generated/SwapAgent/SwapAgent"
import { Transaction } from "../generated/schema"
import { fetchToken } from "./helpers"

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
export function handleSwapFilled(event: SwapFilled): void {}
export function handleSwapPairRegister(event: SwapPairRegister): void {}

export function handleSwapStarted(event: SwapStarted): void {
  // create token
  let token = fetchToken(event.params.erc20Addr)
  token.save()

  // create transaction
  let id = `${event.transaction.hash.toHexString()}_${event.transaction.index}`
  let transaction = Transaction.load(id)
  transaction.amount = event.params.amount
  transaction.fee = event.params.feeAmount
  transaction.timestamp = event.block.timestamp
  transaction.from = event.params.fromAddr
  transaction.save()
}
