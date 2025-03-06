import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import CreateItemForm from "@/components/CreateItemForm/CreateItemForm.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {createTodolistAC} from "@/features/todolists/model/todolists-reducer.ts";
import Todolist from "@/features/todolists/ui/Todolists/Todolist.tsx";

const Main = () => {
    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{mb: '30px'}}>
                <CreateItemForm
                    onCreateItem={createTodolist}
                />
            </Grid>
            <Grid container spacing={4}>
                <Todolist/>
            </Grid>
        </Container>
    );
};

export default Main;