import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "@/components/EditableSpan/EditableSpan.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {ChangeEvent} from "react";
import {changeTaskAC, changeTitleTaskAC, deleteTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {Task} from "@/app/App.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {
    task: Task,
    todolistId: string
}

const TaskItem = ({task, todolistId}: Props) => {
    const dispatch = useAppDispatch()

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskAC({todolistId, taskId: task.id, isDone: newStatusValue}))
    }

    const deleteTaskHandler = () => {
        dispatch(deleteTaskAC({todolistId, taskId: task.id}))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTitleTaskAC({todolistId, taskId: task.id, title}))
    }

    return (
        <ListItem
            sx={{p: 0, justifyContent: 'space-between', opacity: task.isDone ? 0.5 : 1}}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title}
                              onChange={changeTaskTitleHandler}
                />
            </div>
            <IconButton onClick={deleteTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
};

export default TaskItem;