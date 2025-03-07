import {Todolist} from "@/app/App.tsx";
import CreateItemForm from "@/components/CreateItemForm/CreateItemForm.tsx";
import {createTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import TodolistTitle from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import Tasks from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
import FilterButton from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButton.tsx";

type Props = {
    todolist: Todolist
}

const TodolistItem = ({todolist}: Props) => {
    const dispatch = useAppDispatch()

    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC({todolistId: todolist.id, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <div>
                <CreateItemForm onCreateItem={createTaskHandler}/>
            </div>
            <Tasks todolist={todolist}/>
            <FilterButton todolist={todolist}/>
        </div>
    );
};

export default TodolistItem;