import './App.css'
import TodolistItem from "./components/TodoList/TodolistItem.tsx";
import {useState} from "react";

export type Task = {
    id: number;
    title: string;
    isDone: boolean;
}

function App() {
    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter(f => f.id !== taskId))
    }

    return (
        <div className="app">
            <TodolistItem title={"What to learn"} tasks={tasks} deleteTask={deleteTask}/>
        </div>
    )
}

export default App
