"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type TokenType = {
    email : string;
    password : string;
    createdAt : Date;
}

const LoginForm = () => {
    const [input,setInput] = useState( { email : "", password : "" })
    const[passVisibility, setPassVisibility] = useState(false)
    const router = useRouter()

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(input.password.length < 8) {
            alert("Password should be more than 8 characters.")
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.email)) {
            alert("Enter a valid email");
            return;
        }
        const token: TokenType = {
            email: input.email,
            password: input.password,
            createdAt: new Date(),
        }
        localStorage.setItem("fake-token",JSON.stringify(token))

        setInput({email : "", password : ""})
        router.push("/board")
    }

  return (
    <div className='bg-zinc-600 rounded-lg'>
                <div className='w-full border-b-1 py-2'>
                    <h1 className='text-center text-2xl'>Login</h1>
                </div>
            <form onSubmit={(e) => handleSubmit(e)}
            className='w-full px-3 py-4 flex flex-col gap-4 justify-around items-center'>
                <div className='w-full border-b-1 px-2'>
                    <input 
                    value={input.email}
                    onChange={(e) => setInput({...input, email : e.target.value})}
                    type="email" 
                    className='border-0 outline-0' 
                    placeholder="Email"/>
                </div>
                <div className="flex justify-around items-center gap-2 border-b-1">
                    <div>
                        <input
                        value={input.password}
                        onChange={(e) => setInput({...input, password : e.target.value})}
                        type={passVisibility ? "password" : "text"}
                        className='border-0 outline-0 px-2' 
                        placeholder="Password"/>
                        <span 
                        onClick={() => setPassVisibility(!passVisibility)}
                        className="text-xs hover:bg-black/30 hover:cursor-pointer p-1 hover:text-white/40 rounded-xs">
                            {passVisibility ? "Show" : "Hide"}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-3 bg-zinc-500 hover:bg-zinc-500/80 border rounded-sm">
                    <button type="submit" className="hover:cursor-pointer  px-2 py-1">Submit</button>
                </div>
            </form>
     </div>
  )
}

export default LoginForm