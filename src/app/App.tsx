import './App.css'
import TodolistItem from "../components/TodoList/TodolistItem.tsx";
import {useReducer} from "react";
import CreateItemForm from "../components/ItemForm/CreateItemForm.tsx";
import {
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "../model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    createTodolistTasksAC,
    deleteTaskAC,
    taskReducer
} from "../model/tasks-reducer.ts";

export type Task = {
    id: string;
    title: string;
    isDone: boolean;
}

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [key: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed'

function App() {
    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])

    const [tasks, dispatchTasks] = useReducer(taskReducer, {})

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchTasks(deleteTaskAC(todolistId, taskId))
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatchToTodolists(changeFilterTodolistAC(todolistId, filter))
    }

    const createTask = (todolistId: string, title: string) => {
        const action = createTaskAC(todolistId, title)
        dispatchTasks(action)
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatchToTodolists(deleteTodolistAC(todolistId))
    }

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        dispatchTasks(createTodolistTasksAC(action.payload.id))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(changeTaskTitleAC(todolistId, taskId, title))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTitleTodolistAC(todolistId, title))
    }

    return (
        <div className="app">
            <CreateItemForm
                onCreateItem={createTodolist}
            />
            {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id]
                let filteredTasks = todolistTasks
                if (todolist.filter === 'active') {
                    filteredTasks = todolistTasks.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = todolistTasks.filter(task => task.isDone)
                }

                return (
                    <TodolistItem
                        key={todolist.id}
                        todolist={todolist}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                        deleteTodolist={deleteTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}
        </div>
    )
}

export default App
