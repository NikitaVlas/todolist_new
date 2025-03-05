import {Todolist} from "@/app/App.tsx";
import CreateItemForm from "../ItemForm/CreateItemForm.tsx";
import {createTaskAC} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import TodolistTitle from "@/TodolistTitle.tsx";
import Tasks from "@/Tasks.tsx";
import FilterButton from "@/FilterButton.tsx";

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