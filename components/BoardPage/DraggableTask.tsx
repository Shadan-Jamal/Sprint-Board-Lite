"use client"
import {motion} from "motion/react"

type Props = {
    id : string;
    title: string
    description: string
    priority: string
    status : string;
    onDelete: (id: string) => void
    onDragEnd: (taskId: string, evt: PointerEvent, info: { point: { x: number, y: number } }) => void
    onEdit: (id: string, description: string) => void
}

const DraggableTask = ({
    id, 
    title, 
    description, 
    priority, 
    status, 
    onDelete,
    onDragEnd,
    onEdit
} : Props) => {

    const handleEdit = () => {
    const next = window.prompt("Update description:", description)
    if (next !== null) {
      const trimmed = next.trim()
      if (trimmed !== "" && trimmed !== description) {
        onEdit(id, trimmed)
      }
    }
    }

  return (
    <motion.div
    drag
    dragSnapToOrigin
    whileDrag={{opacity : 0.5}}
    onDragEnd={(evt, info) => onDragEnd(id, evt as unknown as PointerEvent, info)}
    className="w-full h-fit cursor-grab  bg-white/80 border-2 border-black rounded-sm relative"
    >
        <div
        className="flex flex-col justify-between items-center gap-3 px-2 py-3 relative"
        >
            <span className={`absolute top-1 right-1 lg:top-2 lg:right-2 font-extrabold text-[11px] lg:text-base
                ${(status === "todo") ? "text-red-500" : 
                  (status === "progress") ? "text-blue-500" :
                  (status === "done" && "text-green-500")}
                  `}>
                {status}
            </span>
            <div className="w-full flex justify-start">
                <h1 className="font-bold text-xs lg:text-xl text-black ">{title}</h1>
            </div>
            <div>
                <p className="text-xs lg:text-lg text-black">{description}</p>
            </div>
            <div className="flex justify-end w-full">
                <span className="text-[10px] lg:text-base font-light text-black">Priority: {priority}</span>
            </div>
            <div className="w-full flex justify-around gap-2">
                <button
                onClick={() => onDelete(id)}
                className="text-[10px] lg:text-sm border-1 hover:bg-zinc-600/40 cursor-pointer p-[3px] rounded-sm text-black">
                    Delete
                </button>
                <button
                onClick={handleEdit}
                className="text-[10px] lg:text-sm border-1 hover:bg-zinc-600/40 cursor-pointer p-[3px] rounded-sm text-black">
                    Edit
                </button>
            </div>
        </div>
    </motion.div>
  )
}

export default DraggableTask