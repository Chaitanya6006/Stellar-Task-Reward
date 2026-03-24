"use client"

import { useEffect, useState } from "react"
import { getAddress } from "@stellar/freighter-api"
import Link from "next/link"

export default function ProfilePage() {
  const [address, setAddress] = useState("")
  const [score, setScore] = useState(0)

  useEffect(() => {
    async function load() {
      const { address } = await getAddress()
      setAddress(address)

      const data = JSON.parse(localStorage.getItem("leaderboard") || "[]")

      const user = data.find((u: any) =>
        u.name === address.slice(0, 6)
      )

      if (user) setScore(user.score)
    }

    load()
  }, [])

  return (
    <main className="p-6">

      <Link href="/">
        <button className="mb-4 bg-gray-800 px-4 py-2 rounded-lg">
          ⬅ Back
        </button>
      </Link>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>

        <p className="text-gray-400">Wallet</p>
        <p className="mb-4">{address}</p>

        <p className="text-gray-400">Total Earned</p>
        <p className="text-green-400 text-xl font-bold">
          {score} pts
        </p>
      </div>

    </main>
  )
}