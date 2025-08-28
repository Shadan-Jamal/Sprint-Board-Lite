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

    const updateTaskStatus = async (
        taskId: string, 
        newStatus: "todo" | "progress" | "done") => {
            console.log(taskId)
        const payload = { status: newStatus, updatedAt: new Date().toISOString() }

        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...payload } : t))
        try {
            await axios.patch(`${API_URL}/tasks/${taskId}`, payload)
        } catch (err) {
            console.error(err)
        }
    }

    const addNewTask = async (newTask : Omit<Tasks[0], 'id'>) => {
        const tempId = `temp-${Date.now()}`
        const clientTask = { ...newTask, id: tempId }
        setTasks(prev => [...prev, clientTask])

        try {
            const res = await axios.post(`${API_URL}/tasks/`, clientTask)
            const saved = res.data
            setTasks(prev => prev.map(t => t.id === tempId ? { ...saved } : t))
        } catch (err) {
            console.error(err)
        }
    }

    const deleteTask = async (id : string) => {
        
    }

    const filterTasks = (id : string) => {

    }

    return {
        tasks,
        updateTaskStatus,
        addNewTask,
        refetch : fetchTasks,
        filterTasks,
        deleteTask
    }
}
