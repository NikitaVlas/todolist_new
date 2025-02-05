import './App.css'
import TodolistItem from "./components/TodoList/TodolistItem.tsx";
import {useState} from "react";

export type Task = {
    id: number;
    title: string;
    isDone: boolean;
}

export type FilterValues = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValues>('all')

    const deleteTask = (taskId: number) => {
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

    return (
        <div className="app">
            <TodolistItem
                title={"What to learn"}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App
