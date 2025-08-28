"use client"
import {motion} from "motion/react"

const DraggableTask = () => {
  return (
    <motion.div
    drag
    className="w-full h-fit cursor-grab  bg-white/80 border-2 border-black rounded-sm "
    >
        <div
        className="flex flex-col justify-between items-center gap-3 px-2 py-3"
        >
            <div className="w-full flex justify-start">
                <h1 className="font-bold text-xs lg:text-xl text-black ">title</h1>
            </div>
            <div>
                <p className="text-xs lg:text-lg text-black">description</p>
            </div>
            <div className="flex justify-end w-full">
                <span className="text-[10px] lg:text-base font-light text-black">Priority</span>
            </div>
        </div>
    </motion.div>
  )
}

export default DraggableTask