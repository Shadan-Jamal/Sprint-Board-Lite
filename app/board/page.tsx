"use client"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"

const page = () => {
  const router = useRouter()

  const token = localStorage.getItem("fake-token")
  if (!token) {
    router.replace("/login")
    return
  }

  return (
    <div className="w-screen h-auto bg-zinc-800">
        <Navbar />
    </div>
  )
}

export default page