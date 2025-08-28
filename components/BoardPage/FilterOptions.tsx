"use client";
import { useEffect, useState } from "react";

type Props = {
    onFilter: (text: string, priority: string) => void
}

const FilterOptions = ({ onFilter } : Props) => {
    const [options, setOptions] = useState({text : "", priority : "all"})

    useEffect(() => {
        console.log("Filtering tasks")
        onFilter(options.text, options.priority)
    },[options]) // eslint-disable-next-line react-hooks/exhaustive-deps
    
  return (
    <div className="col-span-3 h-auto mb-3 py-3">
        <div className="w-full h-fit px-2">
            <h1 className="text-white text-center text-md">Filter By</h1>
        </div>
        <div className="w-full flex justify-center items-center gap-2">
            <div className="w-fit">
                <input
                value={options.text}
                placeholder="Enter title"
                onChange={(e) => setOptions({...options, text : e.target.value})}
                className=" px-1 text-white text-sm w-full border-1 border-white/30 rounded-sm" 
                type="text" 
                />
            </div>
            <div className="w-fit">
                <select
                name="Priority"
                value={options.priority}
                onChange={(e) => setOptions({...options, priority : e.target.value})} 
                className="w-full text-sm text-white rounded-sm border-[1px] border-white/30">
                    <option value="all" className="text-black">All</option>
                    <option value="low" className="text-black">Low</option>
                    <option value="medium" className="text-black">Medium</option>
                    <option value="high" className="text-black">High</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default FilterOptions