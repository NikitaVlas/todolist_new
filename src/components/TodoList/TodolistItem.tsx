import {FilterValues, Todolist} from "../../app/App.tsx";
import Button from '@mui/material/Button'
import {ChangeEvent} from "react";
import CreateItemForm from "../ItemForm/CreateItemForm.tsx";
import {EditableSpan} from "../EditableSpan/EditableSpan.tsx";
import {Box, Checkbox, IconButton, List, ListItem, SxProps} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {changeTaskAC, changeTitleTaskAC, createTaskAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeFilterTodolistAC, changeTitleTodolistAC, deleteTodolistAC} from "@/model/todolists-reducer.ts";

type TodolistItemProps = {
    todolist: Todolist
    containerSx: SxProps
}

const TodolistItem = ({
                          todolist: {id, title, filter},
                          containerSx
                      }: TodolistItemProps) => {

    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()
    const todolistTasks = tasks[id] || []
    let filteredTasks = todolistTasks

    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }


    const createTaskHandler = ( title: string) => {
        dispatch(createTaskAC({todolistId: id, title}))
    }

    const changeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskAC({todolistId: id, taskId, isDone: newStatusValue}))
    }

    const changeFilterHandler = (filter: FilterValues) => {
        dispatch(changeFilterTodolistAC({id: id, filter}))
    }

    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC({id: id}))
    }

    const deleteTaskHandler = (taskId: string) => {
        dispatch(deleteTaskAC({id: id, taskId: taskId}))
    }

    const changeTaskTitleHandler = (taskId: string, title: string) => {
        dispatch(changeTitleTaskAC({todolistId: id, taskId, title}))
    }

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTitleTodolistAC({id: id, title}))
    }

    return (
        <div>
            <div>
                <h3><EditableSpan value={title}
                                  onChange={changeTodolistTitleHandler}
                /></h3>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <div>
                <CreateItemForm onCreateItem={createTaskHandler}/>
            </div>
            {
                filteredTasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <List>
                        {filteredTasks.map(m => (
                            <ListItem key={m.id} sx={{p: 0, justifyContent: 'space-between', opacity: m.isDone ? 0.5 : 1}}>
                                <div>
                                <Checkbox checked={m.isDone} onChange={(e) => changeTaskStatusHandler(m.id, e)}/>
                                <EditableSpan value={m.title}
                                              onChange={(newTitle) => changeTaskTitleHandler(m.id, newTitle)}
                                />
                                </div>
                                <IconButton onClick={() => deleteTaskHandler(m.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                )
            }
            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterHandler('all')}
                >
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('active')}
                >
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}
                >
                    Completed
                </Button>
            </Box>
        </div>
    );
};

export default TodolistItem;