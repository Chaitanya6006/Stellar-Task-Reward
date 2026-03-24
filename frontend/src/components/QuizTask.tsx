"use client"

import { useState } from "react"
import { getAddress, signTransaction } from "@stellar/freighter-api"
import {
  TransactionBuilder,
  Networks,
  BASE_FEE,
  Contract,
  Address,
  rpc,
  nativeToScVal
} from "@stellar/stellar-sdk"

import { TASK_CONTRACT, RPC_URL } from "../config/contracts"

export default function QuizTask({ task }: any) {
  if (!task) return null // ✅ crash fix

  const [answers, setAnswers] = useState<number[]>([])
  const [status, setStatus] = useState("")

  function selectAnswer(qIndex: number, optionIndex: number) {
    const updated = [...answers]
    updated[qIndex] = optionIndex
    setAnswers(updated)
  }

  function checkAnswers() {
    return task.questions.every((q: any, i: number) => answers[i] === q.answer)
  }

  async function submitQuiz() {
    if (!checkAnswers()) {
      setStatus("❌ Wrong answers")
      return
    }

    try {
      setStatus("⏳ Sending reward...")

      const { address } = await getAddress()

      const server = new rpc.Server(RPC_URL)
      const account = await server.getAccount(address)

      const contract = new Contract(TASK_CONTRACT)

      const tx = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET
      })
        .addOperation(
          contract.call(
            "complete_task",
            Address.fromString(address).toScVal(),
            nativeToScVal(task.reward, { type: "i128" })
          )
        )
        .setTimeout(30)
        .build()

      const sim = await server.simulateTransaction(tx)
      const prepared = rpc.assembleTransaction(tx, sim).build()

      const signed = await signTransaction(prepared.toXDR(), {
        networkPassphrase: Networks.TESTNET
      })

      await server.sendTransaction(
        TransactionBuilder.fromXDR(signed.signedTxXdr, Networks.TESTNET)
      )

      setStatus(`✅ Earned ${task.reward} tokens`)
      
      // 🔥 SAVE SCORE
const existing = JSON.parse(localStorage.getItem("leaderboard") || "[]")

const user = {
  name: address.slice(0, 6), // छोटा address
  score: task.reward
}

// अगर user पहले से है → update करो
const found = existing.find((u: any) => u.name === user.name)

if (found) {
  found.score += task.reward
} else {
  existing.push(user)
}

localStorage.setItem("leaderboard", JSON.stringify(existing))
    } catch (err) {
      console.error(err)
      setStatus("❌ Failed")
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <h2 className="text-lg md:text-xl font-bold mb-4">{task.title}</h2>

      {task.questions.map((q: any, i: number) => (
        <div key={i} className="mb-4">
          <p className="mb-2">{q.q}</p>

          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt: string, j: number) => (
              <button
                key={j}
                onClick={() => selectAnswer(i, j)}
                className={`p-2 rounded-lg text-sm md:text-base ${
                  answers[i] === j ? "bg-blue-500" : "bg-gray-700"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={submitQuiz}
        className="bg-green-500 px-4 py-2 rounded-lg text-black font-bold w-full md:w-auto hover:bg-green-600"
      >
        Submit & Earn
      </button>

      <p className="mt-3">{status}</p>
    </div>
  )
}