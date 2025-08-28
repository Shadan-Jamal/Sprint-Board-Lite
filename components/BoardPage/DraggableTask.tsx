"use client"
import {motion} from "motion/react"

type Props = {
    id : string;
    title: string
    description: string
    priority: string
    status : string;
    onDragEnd: (taskId: string, evt: PointerEvent, info: { point: { x: number, y: number } }) => void
}

const DraggableTask = ({
    id, 
    title, 
    description, 
    priority, 
    status, 
    onDragEnd,} : Props) => {
  return (
    <motion.div
    drag
    dragSnapToOrigin
    whileDrag={{opacity : 0.5}}
    onDragEnd={(evt, info) => onDragEnd(id, evt as unknown as PointerEvent, info)}
    className="w-full h-fit cursor-grab  bg-white/80 border-2 border-black rounded-sm "
    >
        <div
        className="flex flex-col justify-between items-center gap-3 px-2 py-3"
        >
            <div className="w-full flex justify-start">
                <h1 className="font-bold text-xs lg:text-xl text-black ">{title}</h1>
            </div>
            <div>
                <p className="text-xs lg:text-lg text-black">{description}</p>
            </div>
            <div className="flex justify-end w-full">
                <span className="text-[10px] lg:text-base font-light text-black">{priority}</span>
            </div>
        </div>
    </motion.div>
  )
}

export default DraggableTask