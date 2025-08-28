"use client"
import { useRouter } from "next/navigation"
import BoardSection from "@/components/BoardPage/BoardSection"

const page = () => {
  const router = useRouter()

  const token = localStorage.getItem("fake-token")
  if (!token) {
    router.replace("/login")
    return
  }

  return (
    <section className="w-screen h-auto bg-zinc-800">
        <BoardSection />
    </section>
  )
}

export default page