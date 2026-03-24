"use client"

import Leaderboard from "../../components/Leaderboard"
import Link from "next/link"

export default function LeaderboardPage() {
  return (
    <main className="p-6">

      {/* Back button */}
      <Link href="/">
        <button className="mb-4 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
          ⬅ Back
        </button>
      </Link>

      <h1 className="text-2xl font-bold mb-4">🏆 Leaderboard</h1>

      <Leaderboard />

    </main>
  )
}