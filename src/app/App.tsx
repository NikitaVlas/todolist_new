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
    changeTaskAC,
    changeTitleTaskAC,
    createTaskAC,
    deleteTaskAC,
} from "../model/tasks-reducer.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {selectTodolist} from "../model/todolists-selectors.ts";
import {selectTasks} from "../model/tasks-selectors.ts";
import {AppBar, IconButton, Paper, Toolbar} from "@mui/material";
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'

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
        dispatch(deleteTaskAC({id: todolistId, taskId: taskId}))
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeFilterTodolistAC({id: todolistId, filter}))
    }

    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC(todolistId, title))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskAC({todolistId, taskId, isDone}))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTitleTaskAC({todolistId, taskId, title}))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTitleTodolistAC({id: todolistId, title}))
    }

    return (
        <div className="app">
            <AppBar position="static">
                <Toolbar>
                    <Container maxWidth={'lg'}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Button color="inherit">Sign in</Button>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container>
                    <CreateItemForm
                        onCreateItem={createTodolist}
                    />
                </Grid>
                <Grid container spacing={4}>
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
                            <Grid key={todolist.id}>
                                <Paper>
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
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default App
