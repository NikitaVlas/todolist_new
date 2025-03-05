import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import CreateItemForm from "@/components/ItemForm/CreateItemForm.tsx";
import {Paper} from "@mui/material";
import TodolistItem from "@/components/TodoList/TodolistItem.tsx";
import {containerSx} from "@/components/TodoList/TodolistItem.styles.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolist} from "@/model/todolists-selectors.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTaskAC, changeTitleTaskAC, createTaskAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    createTodolistAC,
    deleteTodolistAC
} from "@/model/todolists-reducer.ts";
import {FilterValues} from "@app/App.tsx";

const Main = () => {
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
        <Container maxWidth={'lg'}>
            <Grid container sx={{mb: '30px'}}>
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
                            <Paper sx={{ p: '0 20px 20px 20px' }}>
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
                                    containerSx={containerSx}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    );
};

export default Main;