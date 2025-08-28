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
    const [filteredTasks, setFilteredTasks] = useState<Tasks>([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/tasks/`)
            const data = await response.data
            setTasks(data)
            setFilteredTasks(data)
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
        setFilteredTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...payload } : t))
       
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
        setFilteredTasks(prev => [...prev, clientTask])

        try {
            const res = await axios.post(`${API_URL}/tasks/`, clientTask)
            const saved = res.data
            setTasks(prev => prev.map(t => t.id === tempId ? { ...saved } : t))
            setFilteredTasks(prev => prev.map(t => t.id === tempId ? { ...saved } : t))
        } catch (err) {
            console.error(err)
        }
    }

    const deleteTask = async (id : string) => {
        // Optimistic remove
        setTasks(prev => prev.filter(t => t.id !== id))
        setFilteredTasks(prev => prev.filter(t => t.id !== id))

        try {
            await axios.delete(`${API_URL}/tasks/${id}`)
        } catch (err) {
            console.error(err)
        }
    }

    const filterTasks = (text : string, priority : string) => {
        const parsedText = (text ?? "").trim().toLowerCase()
        const parsedPriority = (priority ?? "").toLowerCase()

        const isPriorityActive = parsedText !== "" && parsedPriority !== "priority" && parsedPriority !== "all"

        const next = tasks.filter((t) => {
            const matchesText =
                !parsedText ||
                t.title.toLowerCase().includes(parsedText)
            const matchesPriority =
                !isPriorityActive || t.priority.toLowerCase() === parsedPriority
            return matchesText && matchesPriority
        })
        setFilteredTasks(next)
    }

    const updateTaskDescription = async (id: string, description: string) => {
        const payload = { description, updatedAt: new Date().toISOString() }
        setTasks(prev => prev.map(t => t.id === id ? { ...t, ...payload } : t))
        setFilteredTasks(prev => prev.map(t => t.id === id ? { ...t, ...payload } : t))

        try {
            await axios.patch(`${API_URL}/tasks/${id}`, payload)
        } catch (err) {
            console.error(err)
        }
    }

    return {
        tasks,
        updateTaskStatus,
        addNewTask,
        deleteTask,
        updateTaskDescription,
        refetch : fetchTasks,
        filterTasks,
        filteredTasks,
    }
}
