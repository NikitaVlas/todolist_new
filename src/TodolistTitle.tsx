import {EditableSpan} from "@/components/EditableSpan/EditableSpan.tsx";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTitleTodolistAC, deleteTodolistAC} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolist} from "@/app/App.tsx";

type Props = {
    todolist: Todolist
}

const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist
    const dispatch = useAppDispatch()

    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC({id: id}))
    }

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTitleTodolistAC({id: id, title}))
    }

    return (
        <div>
            <h3><EditableSpan value={title}
                              onChange={changeTodolistTitleHandler}
            /></h3>
            <IconButton onClick={deleteTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
};

export default TodolistTitle;