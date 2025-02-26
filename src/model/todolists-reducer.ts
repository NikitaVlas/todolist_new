import {FilterValues, Todolist} from "../app/App.tsx";
import {v1} from "uuid";

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTitleTodolistAction = ReturnType<typeof changeTitleTodolistAC>
export type ChangeFilterTodolistAction = ReturnType<typeof changeFilterTodolistAC>

type ActionType = DeleteTodolistAction |
    CreateTodolistAction |
    ChangeTitleTodolistAction |
    ChangeFilterTodolistAction;

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: ActionType): Todolist[] => {
    switch (action.type) {
        case "DELETE_TODOLIST":
            return state.filter(todolist => todolist.id !== action.payload.id)
        case "CREATE_TODOLIST": {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case "CHANGE_TITLE_TODOLIST":
            return state.map(todolist => todolist.id === action.payload.todolistId ? {...todolist, title: action.payload.title} : todolist)
        case "CHANGE_FILTER_TODOLIST":
            return state.map(todolist => todolist.id === action.payload.todolistId ? { ...todolist, filter: action.payload.filter } : todolist)
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

export const changeTitleTodolistAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE_TITLE_TODOLIST',
        payload: {
            todolistId,
            title
        }
    } as const
}

export const changeFilterTodolistAC = (todolistId: string, filter: FilterValues) => {
    return {
        type: 'CHANGE_FILTER_TODOLIST',
        payload: {
            todolistId,
            filter
        }
    } as const
}