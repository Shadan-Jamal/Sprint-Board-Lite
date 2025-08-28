"use client";

import { useState } from "react";
import Navbar from "../Navbar"
import Todo from "./Todo"
import Progress from "./Progress"
import Done from "./Done"
import CreateNewTask from "../CreateNewTask";
import { useTasks } from "@/hooks/useTasks"

const BoardSection = () => {
  const [modalOpen, isModalOpen] = useState(false)
    const {tasks} = useTasks()
    console.log(tasks)
  return (
    <div className="w-full">
        <Navbar isModalOpen={isModalOpen}/>
        <div className="w-full grid place-content-center grid-cols-3 bg-zinc-800">
            <Todo />
            <Progress />
            <Done />
        </div>
        {modalOpen && 
          <div
          className="absolute inset-0 grid place-content-center  backdrop-blur-md"
          >
                  <CreateNewTask 
                  isModalOpen={isModalOpen}
                  />
          </div> 
          }
    </div>
  )
}

export default BoardSection