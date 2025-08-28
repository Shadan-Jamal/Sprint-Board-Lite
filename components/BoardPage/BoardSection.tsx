"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar"
import Todo from "./Todo"
import Progress from "./Progress"
import Done from "./Done"
import CreateNewTask from "../CreateNewTask";
import { useTasks } from "@/hooks/useTasks"

const BoardSection = () => {
  const [modalOpen, isModalOpen] = useState(false)
    const {
      tasks,
      updateTaskStatus,
      refetch
    } = useTasks()

    const todoRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const doneRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      refetch()
    },[modalOpen])

    const handleDragEnd = (
    taskId: string,
     _evt : PointerEvent,
      info: { point: { x: number, y: number } 
    }) => {

    const point = info.point

    const inBox = (el: HTMLDivElement | null) => {
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom
    }

    if (inBox(todoRef.current)) {
      updateTaskStatus(taskId, "todo")
      return
    }
    if (inBox(progressRef.current)) {
      updateTaskStatus(taskId, "progress")
      return
    }
    if (inBox(doneRef.current)) {
      updateTaskStatus(taskId, "done")
      return
    }

  }
    console.log(tasks)
  return (
    <div className="w-full">
        <Navbar isModalOpen={isModalOpen}/>
        <div className="w-full grid place-content-center grid-cols-3 bg-zinc-800">
            <Todo
            tasks={tasks.filter((t) => t.status === "todo")} 
            ref={todoRef}
            onDragEnd={handleDragEnd}
            />
            <Progress 
            tasks={tasks.filter((t) => t.status === "progress")} 
            ref={todoRef}
            onDragEnd={handleDragEnd}
            />
            <Done 
            tasks={tasks.filter((t) => t.status === "done")} 
            ref={todoRef}
            onDragEnd={handleDragEnd}
            />
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