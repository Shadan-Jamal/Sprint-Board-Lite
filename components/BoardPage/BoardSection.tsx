"use client";

import CreateNewTask from "../CreateNewTask";
import Navbar from "../Navbar"
import Done from "./Done"
import Progress from "./Progress"
import Todo from "./Todo"
import { useEffect, useRef, useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import FilterOptions from "./FilterOptions";

const BoardSection = () => {
  const [modalOpen, isModalOpen] = useState(false)
  const {  
    updateTaskStatus, 
    refetch, 
    filteredTasks, 
    filterTasks, 
    deleteTask, 
    updateTaskDescription,
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
    console.log(point)
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

  const handleDelete = (id: string) => {
    deleteTask(id)
  }

  const handleEdit = (id: string, nextDescription: string) => {
    updateTaskDescription(id, nextDescription)
  }

  return (
    <div className="font-mono w-full">
        <Navbar isModalOpen={isModalOpen}/>
        <div 
        className="w-full grid place-items-center grid-cols-3 relative">
          <FilterOptions onFilter={filterTasks} />

          <Todo
          ref={todoRef}
          tasks={filteredTasks.filter(t => t.status === "todo")} 
          onDragEnd={handleDragEnd}
          onDelete={handleDelete}
          onEdit={handleEdit}
          />

          <Progress 
          ref={progressRef} 
          tasks={filteredTasks.filter(t => t.status === "progress")} 
          onDragEnd={handleDragEnd}
          onDelete={handleDelete}
          onEdit={handleEdit}
          />

          <Done 
          ref={doneRef} 
          tasks={filteredTasks.filter(t => t.status === "done")} 
          onDragEnd={handleDragEnd}
          onDelete={handleDelete}
          onEdit={handleEdit}
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