import {Todolist} from "../App.tsx";
import {v1} from "uuid";

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

type ActionType = DeleteTodolistAction |
    CreateTodolistAction;

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: ActionType): Todolist[] => {
    switch (action.type) {
        case "DELETE_TODOLIST":
            return state.filter(todolist => todolist.id !== action.payload.id)
        case "CREATE_TODOLIST":{
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
    }
}

export const deleteTodolistAC = (id: string) => {
    return {
        type: 'DELETE_TODOLIST',
        payload: {
            id
        }
    } as const
}

export const createTodolistAC = (title: string) => {
    return {
        type: 'CREATE_TODOLIST',
        payload: {
            id: v1(),
            title
        }
    } as const
}