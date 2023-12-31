'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Summary() {
  const [totalSpent, setTotalSpent] = useState(0)
  
  useEffect(() => {
    getTotalSpent()
  }, [])

  const getTotalSpent = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    await setTotalSpent(urlParams.get('total'))
    removeSearchParams()
  }
  const removeSearchParams = () => {
    window.history.replaceState({}, document.title, "/summary")
  }
  return (
    <main className="flex min-h-screen flex-col">
    <div className="navigation">
      <Link className="nav" href="/">New transaction</Link>
      <Link className="nav" href="/inventory">Check Inventory</Link>
    </div>
      <div className="transaction-summary">
        <div>TRANSACTION COMPLETE!</div>
        <div hidden={!totalSpent}>Total spent: ${totalSpent}</div>
      </div>
    </main>
  )
}
