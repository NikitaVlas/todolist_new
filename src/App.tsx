import './App.css'
import TodolistItem from "./components/TodoList/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type Task = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterValues = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValues>('all')

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(f => f.id !== taskId))
    }

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const createTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const newState = tasks.map(task => task.id == taskId ? { ...task, isDone } : task)
        setTasks(newState)
    }

    return (
        <div className="app">
            <TodolistItem
                title={"What to learn"}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    )
}

export default App
