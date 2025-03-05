import {ChangeEvent} from 'react';
import {Checkbox, IconButton, List, ListItem} from "@mui/material";
import {EditableSpan} from "@/components/EditableSpan/EditableSpan.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTaskAC, changeTitleTaskAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {Todolist} from "@/app/App.tsx";

type Props = {
    todolist: Todolist
}

const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist
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

    const changeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskAC({todolistId: id, taskId, isDone: newStatusValue}))
    }

    const deleteTaskHandler = (taskId: string) => {
        dispatch(deleteTaskAC({id: id, taskId: taskId}))
    }

    const changeTaskTitleHandler = (taskId: string, title: string) => {
        dispatch(changeTitleTaskAC({todolistId: id, taskId, title}))
    }
    return (
        <>
            {
                filteredTasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <List>
                        {filteredTasks.map(m => (
                            <ListItem key={m.id}
                                      sx={{p: 0, justifyContent: 'space-between', opacity: m.isDone ? 0.5 : 1}}>
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
        </>
    );
};

export default Tasks;