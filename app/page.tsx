"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("fake-token")
      if(user){
        setIsLoggedIn(true)
      }
    }

    checkUser()
  },[])

  if(isLoggedIn){
    router.replace("/board")
  }
  else{
    router.replace("/login")
  }

  return (
    <>
    </>
  );
}

export default home;