"use client"

import { useEffect, useState } from "react"

export default function Leaderboard() {
  const [users, setUsers] = useState<any[]>([])

  function getBadge(index: number) {
    if (index === 0) return "🥇"
    if (index === 1) return "🥈"
    if (index === 2) return "🥉"
    return "🏅"
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("leaderboard") || "[]")

    // sort high → low
    data.sort((a: any, b: any) => b.score - a.score)

    setUsers(data)
  }, [])

  return (
    <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
      <h2 className="text-lg font-bold mb-3">🏆 Leaderboard</h2>

      {users.length === 0 && (
        <p className="text-gray-400">No data yet</p>
      )}

      {users.map((user, i) => (
        <div
          key={i}
          className="flex justify-between items-center py-2 border-b border-gray-800"
        >
          <span>
            {getBadge(i)} #{i + 1} {user.name}
          </span>

          <span className="text-green-400 font-bold">
            {user.score} pts
          </span>
        </div>
      ))}
    </div>
  )
}