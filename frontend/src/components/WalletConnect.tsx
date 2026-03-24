"use client"

import { useState } from "react"
import {
  requestAccess,
  getAddress,
  isConnected
} from "@stellar/freighter-api"

export default function WalletConnect() {
  const [address, setAddress] = useState("")
  const [status, setStatus] = useState("")

  async function connectWallet() {
    try {
      setStatus("⏳ Connecting...")

      // 🔥 THIS TRIGGERS POPUP
      const access = await requestAccess()

      if (access.error) {
        setStatus("❌ Permission denied")
        return
      }

      const connected = await isConnected()

      if (!connected) {
        setStatus("❌ Not connected")
        return
      }

      const { address } = await getAddress()

      setAddress(address)
      setStatus("✅ Wallet Connected")
    } catch (err) {
      console.error(err)
      setStatus("❌ Error connecting wallet")
    }
  }

  return (
    <div className="mb-6">
      <button
        onClick={connectWallet}
        className="bg-blue-500 px-5 py-2 rounded-lg text-white font-bold hover:bg-blue-600"
      >
        Connect Wallet
      </button>

      {address && (
        <p className="mt-2 text-green-400">
          {address.slice(0, 6)}...{address.slice(-4)}
        </p>
      )}

      <p className="text-sm text-gray-400 mt-1">{status}</p>
    </div>
  )
}