"use client"

import BoardSection from "@/components/BoardPage/BoardSection"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("fake-token") : null
    if (!token) {
      router.replace("/login")
      return
    }
    setReady(true)
  }, [router])

  if (!ready) return null

  return (
    <div className="w-screen h-auto min-h-screen bg-zinc-800">
        <BoardSection />
    </div>
  )
}

export default Page