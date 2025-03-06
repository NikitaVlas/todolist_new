import {Box, SxProps} from "@mui/material";
import Button from "@mui/material/Button";
import {FilterValues, Todolist} from "@/app/App.tsx";
import {changeFilterTodolistAC} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {
    todolist: Todolist
    containerSx: SxProps
}

const FilterButton = ({todolist, containerSx}: Props) => {
    const {id, filter} = todolist
    const dispatch = useAppDispatch()
    const changeFilterHandler = (filter: FilterValues) => {
        dispatch(changeFilterTodolistAC({id: id, filter}))
    }

    return (
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
    );
};

export default FilterButton;
