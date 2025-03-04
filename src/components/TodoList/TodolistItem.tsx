import {FilterValues, Task, Todolist} from "../../app/App.tsx";
import Button from '@mui/material/Button'
import {ChangeEvent} from "react";
import CreateItemForm from "../ItemForm/CreateItemForm.tsx";
import {EditableSpan} from "../EditableSpan/EditableSpan.tsx";
import {Box, Checkbox, IconButton, List, ListItem, SxProps} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'

type TodolistItemProps = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    containerSx: SxProps
}

const TodolistItem = ({
                          todolist: {id, title, filter},
                          tasks,
                          deleteTask,
                          changeFilter,
                          createTask,
                          changeTaskStatus,
                          deleteTodolist,
                          changeTaskTitle,
                          changeTodolistTitle,
                          containerSx
                      }: TodolistItemProps) => {



    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    const changeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(id, taskId, newStatusValue)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const deleteTaskHandler = (taskId: string) => {
        deleteTask(id, taskId)
    }

    const changeTaskTitleHandler = (taskId: string, title: string) => {
        changeTaskTitle(id, taskId, title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
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
                tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <List>
                        {tasks.map(m => (
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