"use client"

import { useEffect, useState } from "react"
import { getAddress } from "@stellar/freighter-api"
import {
  Contract,
  rpc,
  Address,
  TransactionBuilder,
  Networks,
  BASE_FEE
} from "@stellar/stellar-sdk"

import { RPC_URL } from "../config/contracts"

const TOKEN_ID = "CCHD4EXBCDTIK6XPM7UJTLPKHKKFEEYEF2757XPUZLEYDWUVBKGWA5GM"

export default function TokenBalance() {
  const [balance, setBalance] = useState("0")

  useEffect(() => {
    async function loadBalance() {
      try {
        const { address } = await getAddress()

        const server = new rpc.Server(RPC_URL)
        const account = await server.getAccount(address)

        const contract = new Contract(TOKEN_ID)

        const tx = new TransactionBuilder(account, {
          fee: BASE_FEE,
          networkPassphrase: Networks.TESTNET
        })
          .addOperation(
            contract.call(
              "balance",
              Address.fromString(address).toScVal()
            )
          )
          .setTimeout(30)
          .build()

        const sim = await server.simulateTransaction(tx)

        // 🔥 FINAL FIX (correct Soroban parsing)
        let raw = "0"

        // @ts-ignore
        const retval = sim.result?.retval

        if (retval && retval._value) {
          // i128 → lo part
          // @ts-ignore
          raw = retval._value._attributes?.lo?._value || "0"
        }

        // decimals = 7
        const formatted = (Number(raw) / 10000000).toFixed(6)

        setBalance(formatted)

      } catch (err) {
        console.log("Balance error:", err)
        setBalance("0")
      }
    }

    loadBalance()
  }, [])

  return (
    <>
      <p className="text-xs text-gray-400">Balance</p>
      <p className="text-sm font-bold text-green-400">
        {balance} TTK
      </p>
    </>
  )
}