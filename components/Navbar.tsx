"use client";

import { useRouter } from "next/navigation"

const Navbar = () => {
    const router = useRouter()
    
    const handleClick = () => {
        localStorage.removeItem("fake-token")
        router.push("/login")
    }
  return (
    <>
        <div className="w-full h-fit py-3 bg-amber-100 px-2">
            <div className="w-full flex justify-between items-center">
                <div className="flex justify-around items-center gap-3">
                    <div className="px-3 py-2 bg-blue-500">
                        <h1 className="text-white font-bold text-lg w-fit">
                            Sprint Board
                        </h1>
                    </div>
                </div>
                <div className="bg-red-500 rounded-md hover:bg-red-700">
                    <button 
                    onClick={handleClick}
                    className="text-lg font-medium px-3 py-2 text-white hover:cursor-pointer">
                        Logout
                    </button>
                </div>
            </div>
            
        </div>
    </>
  )
}

export default Navbar