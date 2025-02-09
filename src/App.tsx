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
