import './App.css'
import TodolistItem from "../components/TodoList/TodolistItem.tsx";
import CreateItemForm from "../components/ItemForm/CreateItemForm.tsx";
import {
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    createTodolistAC,
    deleteTodolistAC,
} from "../model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
} from "../model/tasks-reducer.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {selectTodolist} from "../model/todolists-selectors.ts";
import {selectTasks} from "../model/tasks-selectors.ts";

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
    const todolists = useAppSelector(selectTodolist)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC(todolistId, taskId))
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeFilterTodolistAC(todolistId, filter))
    }

    const createTask = (todolistId: string, title: string) => {
        const action = createTaskAC(todolistId, title)
        dispatch(action)
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC(todolistId))
    }

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTitleTodolistAC(todolistId, title))
    }

    return (
        <div className="app">
            <CreateItemForm
                onCreateItem={createTodolist}
            />
            {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id] || []
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
