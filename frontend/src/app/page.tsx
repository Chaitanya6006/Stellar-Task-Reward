"use client"

import TaskList from "../components/TaskList"
import WalletConnect from "../components/WalletConnect"
import TokenBalance from "../components/TokenBalance"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-6 space-y-6">

      {/* 🔥 TOP BAR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        {/* LEFT */}
        <WalletConnect />

        {/* RIGHT */}
        <div className="bg-gray-900 px-4 py-2 rounded-xl border border-gray-700 w-full md:w-auto text-center">
          <TokenBalance />
        </div>
      </div>

      {/* 🔥 NAV BUTTONS */}
      <div className="flex flex-wrap justify-center md:justify-end gap-3">

        <Link href="/leaderboard">
          <button className="bg-blue-500 px-4 py-2 rounded-lg text-black font-bold hover:bg-blue-600 w-full md:w-auto">
            Leaderboard
          </button>
        </Link>

        <Link href="/profile">
          <button className="bg-purple-500 px-4 py-2 rounded-lg text-black font-bold hover:bg-purple-600 w-full md:w-auto">
            Profile
          </button>
        </Link>
      </div>

      {/* 🔥 TASK LIST */}
      <TaskList />

    </main>
  )
}