import Grid from "@mui/material/Grid2";
import {Paper} from "@mui/material";
import TodolistItem from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolist} from "@/features/todolists/model/todolists-selectors.ts";

const Todolist = () => {
    const todolists = useAppSelector(selectTodolist)

    return (
        <>
            {todolists.map(todolist => {
                return (
                    <Grid key={todolist.id}>
                        <Paper sx={{ p: '0 20px 20px 20px' }}>
                            <TodolistItem
                                key={todolist.id}
                                todolist={todolist}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};

export default Todolist;