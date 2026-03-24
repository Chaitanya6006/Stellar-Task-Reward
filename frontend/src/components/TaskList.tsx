"use client"

import { useState } from "react"
import { TASKS } from "../config/tasks"
import QuizTask from "./QuizTask"

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

export default function TaskList() {
  const [selectedTask, setSelectedTask] = useState<any>(null)

  async function completeSimpleTask(task: any) {
    try {
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
            Address.fromString(address).toScVal(),              // ✅ user
            nativeToScVal(task.reward, { type: "i128" })        // ✅ reward
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

      alert(`✅ Earned ${task.reward} TOKENS`)
    } catch (err) {
      console.error(err)
      alert("❌ Failed")
    }
  }

  if (selectedTask) {
    return (
      <div>
        <button
          onClick={() => setSelectedTask(null)}
          className="mb-4 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          ⬅ Back
        </button>

        {selectedTask.questions ? (
          <QuizTask task={selectedTask} />
        ) : (
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-3">
              {selectedTask.title}
            </h2>

            <p className="text-gray-400 mb-4">
              {selectedTask.description}
            </p>

            <button
              onClick={() => completeSimpleTask(selectedTask)}
              className="bg-green-500 px-5 py-2 rounded-lg text-black font-bold hover:bg-green-600"
            >
              Complete & Earn
            </button>
          </div>
        )}
      </div>
    )
  }

  const renderLevel = (level: any, title: string) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {level.map((task: any) => (
          <div
            key={task.id}
            onClick={() => setSelectedTask(task)}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl cursor-pointer hover:scale-105 transition transform shadow-lg border border-gray-700"
          >
            <h3 className="text-lg font-semibold mb-2">
              {task.title}
            </h3>

            <p className="text-sm text-gray-400 mb-3">
              {task.description || "Answer quiz & earn rewards"}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-green-400 font-bold">
                +{task.reward} TOKENS
              </span>

              <span className="text-xs text-gray-500">
                Click →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="mt-6">
      {renderLevel(TASKS.level1, "🟢 Level 1")}
      {renderLevel(TASKS.level2, "🟡 Level 2")}
      {renderLevel(TASKS.level3, "🔴 Level 3")}
    </div>
  )
}