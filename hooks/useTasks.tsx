import { useState, useEffect } from "react";
import axios from "axios";

type Tasks = {
    id: string,
    title: string,
    description: string,
    status: string,
    priority: string,
    createdAt: string,
    updatedAt: string
}[]

const API_URL = process.env.NEXT_PUBLIC_API_URL
export const useTasks = () => {
    const [tasks, setTasks] = useState<Tasks>([])

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/tasks/`)
            const data = await response.data
            setTasks(data)
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const addNewTask = async (newTask : Omit<Tasks[0], 'id'>) => {

    }

    const deleteTask = async (id : string) => {
        
    }

    const filterTasks = (id : string) => {

    }

    return {
        tasks,
        addNewTask,
        fetchTasks,
        filterTasks,
        deleteTask
    }
}
