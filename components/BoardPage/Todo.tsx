"use client";

import DraggableTask from "./DraggableTask"
import { forwardRef } from "react";
import {motion} from "motion/react"

type Props = {
  tasks: Array<{ 
    id: string, 
    title: string, 
    description: string, 
    priority: string, 
    status : string 
  }>,
  onDragEnd: (
    taskId: string, 
    evt: PointerEvent, 
    info: { point: { x: number, y: number } 
  }) => void
  onDelete: (id: string) => void
  onEdit: (id: string, description: string) => void
  pendingIds?: Set<string>
}

const Todo = forwardRef<HTMLDivElement, Props>(({
  tasks, 
  onDelete,
  onDragEnd,
  onEdit,
  pendingIds
}, ref) => {
  console.log(tasks)
  return (
    <motion.div
    ref={ref} 
    className="h-screen w-full border-r-1 border-t-1 border-r-white border-t-white flex flex-col justify-start items-center gap-5 px-5 py-5">
        {tasks.map((t) => {
         return  <DraggableTask
          key={t.id}
          id={t.id}
          title={t.title}
          status={t.status}
          description={t.description}
          priority={t.priority}
          onDragEnd={onDragEnd}
          onDelete={onDelete}
          onEdit={onEdit}
          isQueued={pendingIds?.has(t.id)}
          />
        }
        )}
    </motion.div>
  )
})

export default Todo