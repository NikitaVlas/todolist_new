import './App.css'
import TodolistItem from "./components/TodoList/TodolistItem.tsx";
import {useReducer} from "react";
import {v1} from "uuid";
import CreateItemForm from "./components/ItemForm/CreateItemForm.tsx";
import {
    changeTitleTodolistAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {createTaskAC, deleteTaskAC, taskReducer} from "./model/tasks-reducer.ts";

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

const todolistId1 = v1()
const todolistId2 = v1()

export type FilterValues = 'all' | 'active' | 'completed'

function App() {
    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchTasks] = useReducer(taskReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchTasks(deleteTaskAC(todolistId, taskId))
    }

    // const changeFilter = (todolistId: string, filter: FilterValues) => {
    //     setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter } : todolist))
    // }

    const createTask = (todolistId: string, title: string) => {
        const action = createTaskAC(todolistId, title)
        dispatchTasks(action)
    }

    // const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    //     setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)})
    // }

    const deleteTodolist = (todolistId: string) => {
        dispatchToTodolists(deleteTodolistAC(todolistId))
    }

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        // dispatchTasks(createTaskAC)
    //     setTasks({...tasks, [action.payload.id]: []})
    }

    // const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    //     setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    // }

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
                        // changeFilter={changeFilter}
                        createTask={createTask}
                        // changeTaskStatus={changeTaskStatus}
                        deleteTodolist={deleteTodolist}
                        // changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}
        </div>
    )
}

export default App
