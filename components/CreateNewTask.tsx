"use client";
import { useState, Dispatch, SetStateAction, FormEvent } from "react";
import { useTasks } from "@/hooks/useTasks";

type Props = {
    isModalOpen :  Dispatch<SetStateAction<boolean>>,
}

const CreateNewTask = ({isModalOpen} : Props) => {
    const [inputs, setInputs] = useState({title : "", description : "", priority : ""})
    const { addNewTask } = useTasks()

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!inputs.title || !inputs.description || !inputs.priority) {
            alert("Please fill in all fields")
            return
        }

        const newTask = {
            title : inputs.title,
            description : inputs.description,
            priority : inputs.priority,
            status : "todo",
            createdAt : new Date().toISOString(),
            updatedAt : new Date().toISOString(),
        }

        try {
            // Addding to local state first for immediate UI update
            addNewTask(newTask)
            
            // Resetting form and close modal
            setInputs({title : "", description : "", priority : ""})
            isModalOpen(false)
        } catch (error) {
            console.error("Failed to create task:", error)
            alert("Failed to create task. Please try again.")
        }
    }

  return (
        <div 
        className="bg-zinc-200 w-[300px] h-auto rounded-md border-2 border-slate-600 relative px-5 py-8">
            <form
            onSubmit={(e) => handleSubmit(e)} 
            className="py-2 flex flex-col justify-between items-center w-full gap-4">
                <div className="w-full border-b-1 border-b-slate-700">
                    <input 
                    value={inputs.title}
                    onChange={(e) => setInputs({...inputs, title : e.target.value})}
                    className="outline-0 border-0 px-2 py-1 placeholder:text-black/40 text-black"
                    placeholder="Title"
                    type="text"
                    />
                </div>
                <div className="w-full border-b-1 border-b-slate-700">
                    <textarea
                    value={inputs.description}
                    onChange={(e) => setInputs({...inputs, description : e.target.value})}
                    rows={3}
                    className="w-full h-auto px-2 py-1 outline-0 placeholder:text-black/40 text-black"
                    placeholder="Description"
                    />
                </div>
                <div className="w-full border-b-1 border-b-slate-700">
                    <div className="flex items-center gap-4 px-2 py-2">
                        <label className="flex items-center gap-1 text-black">
                        <input 
                            type="radio" 
                            name="priority" 
                            value="low"
                            checked={inputs.priority === "low"}
                            onChange={(e) => setInputs({...inputs, priority: e.target.value})}
                            />
                            <span>Low</span>
                        </label>
                        <label className="flex items-center gap-1 text-black" >
                            <input 
                            type="radio" 
                            name="priority" 
                            value="medium"
                            checked={inputs.priority === "medium"}
                            onChange={(e) => setInputs({...inputs, priority: e.target.value})}
                            />
                            <span>Medium</span>
                        </label>
                        <label className="flex items-center gap-1 text-black">
                            <input 
                            type="radio" 
                            name="priority" 
                            value="high"
                            checked={inputs.priority === "high"}
                            onChange={(e) => setInputs({...inputs, priority: e.target.value})}
                            />
                            <span>High</span>
                        </label>
                    </div>
                </div>
                <div className="w-fit border-1 border-black px-2 py-1 bg-white/40 hover:bg-white rounded-md ">
                    <button className=" text-black cursor-pointer">
                        Create
                    </button>
                </div>
            </form>
            <div className="absolute top-0 right-0 mt-2 me-2 bg-red-500 hover:bg-red-500/80 rounded-md p-1">
                <button
                className="text-sm p-1 hover:cursor-pointer text-white"
                onClick={() => isModalOpen(false)}
                >Close</button>
            </div>
        </div>
    )
}

export default CreateNewTask