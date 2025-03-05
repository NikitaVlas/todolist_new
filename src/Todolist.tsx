import Grid from "@mui/material/Grid2";
import {Paper} from "@mui/material";
import TodolistItem from "@/components/TodoList/TodolistItem.tsx";
import {containerSx} from "@/components/TodoList/TodolistItem.styles.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolist} from "@/model/todolists-selectors.ts";

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
                                containerSx={containerSx}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};

export default Todolist;