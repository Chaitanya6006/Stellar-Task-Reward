import { Contract } from "@stellar/stellar-sdk";

import { TASK_CONTRACT, TOKEN_CONTRACT } from "../config/contracts";

export function getTaskContract() {
  return new Contract(TASK_CONTRACT);
}

export function getTokenContract() {
  return new Contract(TOKEN_CONTRACT);
}