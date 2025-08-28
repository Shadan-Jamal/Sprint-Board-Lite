import { useState, useEffect, useRef } from "react";
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

type QueueItem = 
  | { type: "add", tempId: string, payload: Omit<Tasks[0], "id"> }
  | { type: "updateStatus", id: string, status: "todo" | "progress" | "done", updatedAt: string }
  | { type: "updateDescription", id: string, description: string, updatedAt: string }
  | { type: "delete", id: string }


const QUEUE_KEY = "taskWriteQueue"

const isOnline = () => typeof navigator !== "undefined" ? navigator.onLine : true
const API_URL = process.env.NEXT_PUBLIC_API_URL

export const useTasks = () => {
    const [tasks, setTasks] = useState<Tasks>([])
    const [filteredTasks, setFilteredTasks] = useState<Tasks>([]);
    const [pendingIds, setPendingIds] = useState<Set<string>>(new Set())

    const queueRef = useRef<QueueItem[]>([])
    console.log(API_URL)
    //loading the queue with the queued items in localstorage
    const loadQueue = () => {
        try {
            const raw = localStorage.getItem(QUEUE_KEY)
            queueRef.current = raw ? JSON.parse(raw) : []
            setPendingIds(new Set(collectPendingIds(queueRef.current)))
        } catch(err) {
            console.error(err)
        }
    }

    //saving a fresh batch of items in localstorage
    const saveQueue = () => {
        localStorage.setItem(QUEUE_KEY, JSON.stringify(queueRef.current))
        setPendingIds(new Set(collectPendingIds(queueRef.current)))
    }

    const collectPendingIds = (q: QueueItem[]) => {
        const ids: string[] = []
        q.forEach(it => {
            if (it.type === "add") ids.push(it.tempId)
            else ids.push(it.id)
        })
        return ids
    }

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
        loadQueue()
        fetchTasks()
    }, [])

    useEffect(() => {
        const onOnline = () => { flushQueue() }
        window.addEventListener("online", onOnline)
        return () => window.removeEventListener("online", onOnline)
    }, [])

    //fetching all the pending operations in queue and executing them
    const flushQueue = async () => {
        if (!isOnline() || queueRef.current.length === 0) return
        const nextQueue: QueueItem[] = []
        for (const item of queueRef.current) {
            try {
                if (item.type === "add") {
                    const res = await axios.post(`${API_URL}/tasks/`, { ...item.payload })
                    const saved = res.data
                    setTasks(prev => prev.map(t => t.id === item.tempId ? { ...saved } : t))
                    setFilteredTasks(prev => prev.map(t => t.id === item.tempId ? { ...saved } : t))
                } else if (item.type === "updateStatus") {
                    await axios.patch(`${API_URL}/tasks/${item.id}`, { status: item.status, updatedAt: item.updatedAt })
                } else if (item.type === "updateDescription") {
                    await axios.patch(`${API_URL}/tasks/${item.id}`, { description: item.description, updatedAt: item.updatedAt })
                } else if (item.type === "delete") {
                    await axios.delete(`${API_URL}/tasks/${item.id}`)
                }
            } catch (err) {
                // keep it in queue to retry later
                nextQueue.push(item)
            }
        }
        queueRef.current = nextQueue
        saveQueue()
    }

    const updateTaskStatus = async (
        taskId: string, 
        newStatus: "todo" | "progress" | "done") => {
            console.log(taskId)
        const payload = { status: newStatus, updatedAt: new Date().toISOString() }

        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...payload } : t))
        setFilteredTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...payload } : t))
       
        if (!isOnline()) {
            queueRef.current.push({ type: "updateStatus", id: taskId, status: newStatus, updatedAt: payload.updatedAt })
            saveQueue()
            return
        }

        try {
            await axios.patch(`${API_URL}/tasks/${taskId}`, payload)
        } catch (err) {
            // enqueue on failure and keep optimistic UI
            queueRef.current.push({ type: "updateStatus", id: taskId, status: newStatus, updatedAt: payload.updatedAt })
            saveQueue()
        }
    }

    const addNewTask = async (newTask : Omit<Tasks[0], 'id'>) => {
        const tempId = `temp-${Date.now()}`
        const clientTask = { ...newTask, id: tempId }
        setTasks(prev => [...prev, clientTask])
        setFilteredTasks(prev => [...prev, clientTask])

        if (!isOnline()) {
            queueRef.current.push({ type: "add", tempId, payload: newTask })
            saveQueue()
            return
        }

        try {
            const res = await axios.post(`${API_URL}/tasks/`, clientTask)
            const saved = res.data
            setTasks(prev => prev.map(t => t.id === tempId ? { ...saved } : t))
            setFilteredTasks(prev => prev.map(t => t.id === tempId ? { ...saved } : t))
        } catch (err) {
            queueRef.current.push({ type: "add", tempId, payload: newTask })
            saveQueue()
        }
    }

    const deleteTask = async (id : string) => {
        // Optimistic remove
        setTasks(prev => prev.filter(t => t.id !== id))
        setFilteredTasks(prev => prev.filter(t => t.id !== id))

        if (!isOnline()) {
            queueRef.current.push({ type: "delete", id })
            saveQueue()
            return
        }

        try {
            await axios.delete(`${API_URL}/tasks/${id}`)
        } catch (err) {
            // Keeping it removed locally but ensure deletion is queued for retry
            queueRef.current.push({ type: "delete", id })
            saveQueue()
        }
    }

    const filterTasks = (text : string, priority : string) => {
        const normalizedText = (text ?? "").trim().toLowerCase()
        const normalizedPriority = (priority ?? "").toLowerCase()

        const isPriorityActive = normalizedPriority !== "" && normalizedPriority !== "priority" && normalizedPriority !== "all"

        const next = tasks.filter((t) => {
            const matchesText =
                !normalizedText ||
                t.title.toLowerCase().includes(normalizedText)
            const matchesPriority =
                !isPriorityActive || t.priority.toLowerCase() === normalizedPriority
            return matchesText && matchesPriority
        })
        setFilteredTasks(next)
    }

    const updateTaskDescription = async (id: string, description: string) => {
        const payload = { description, updatedAt: new Date().toISOString() }
        setTasks(prev => prev.map(t => t.id === id ? { ...t, ...payload } : t))
        setFilteredTasks(prev => prev.map(t => t.id === id ? { ...t, ...payload } : t))

        if (!isOnline()) {
            queueRef.current.push({ type: "updateDescription", id, description, updatedAt: payload.updatedAt })
            saveQueue()
            return
        }

        try {
            await axios.patch(`${API_URL}/tasks/${id}`, payload)
        } catch (err) {
            queueRef.current.push({ type: "updateDescription", id, description, updatedAt: payload.updatedAt })
            saveQueue()
        }
    }

    return {
        //global state for tasks
        tasks,
        filteredTasks,

        //task operations
        addNewTask,
        deleteTask,
        updateTaskStatus,
        updateTaskDescription,
        refetch : fetchTasks,
        filterTasks,

        //variant
        pendingIds,
        flushQueue
    }
}
