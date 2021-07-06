import {
  SwapFilled,
  SwapStarted,
} from "../generated/SwapAgentBSC/SwapAgentBSC";
import { Transaction } from "../generated/schema";
import { fetchToken } from "./helpers";

export function handleSwapStarted(event: SwapStarted): void {
  // create token
  let token = fetchToken(event.params.bep20Addr);
  token.save();

  // create transaction
  let transaction = Transaction.load(event.transaction.hash.toHexString());
  transaction.amount = event.params.amount;
  transaction.address = event.params.fromAddr;
  transaction.fee = event.params.feeAmount;
  transaction.from_token = token.id;
  transaction.created_at = event.block.timestamp;
  transaction.created_by = event.transaction.hash;
  transaction.save();
}

export function handleSwapFilled(event: SwapFilled): void {
  // create token
  let token = fetchToken(event.params.bep20Addr);
  token.save();

  // fill transaction
  let transaction = Transaction.load(event.params.ethTxHash.toHex());
  transaction.amount = event.params.amount;
  transaction.address = event.params.toAddress;
  transaction.to_token = token.id;
  transaction.filled_at = event.block.timestamp;
  transaction.filled_by = event.transaction.hash;
  transaction.save();
}
