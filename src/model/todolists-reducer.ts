import {FilterValues, Todolist} from "../app/App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const deleteTodolistAC = createAction<{ id: string }>('todolist/deleteTodolist')
export const createTodolistAC = createAction('todolist/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})
export const changeTitleTodolistAC = createAction<{ id: string, title: string }>('todolist/changeTitleTodolist')
export const changeFilterTodolistAC = createAction<{id: string, filter: FilterValues}>('todolists/changeTodolistFilter')

const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, builder => {
        builder.addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
            .addCase(createTodolistAC, (state, action) => {
                state.push({...action.payload, filter: "all"})
            })
            .addCase(changeTitleTodolistAC, (state, action) => {
                const todolist = state.find(todolist => todolist.id === action.payload.id)
                if (todolist) {
                    todolist.title = action.payload.title
                }
            })
            .addCase(changeFilterTodolistAC, (state, action) => {
                const index = state.findIndex(todolist => todolist.id === action.payload.id)
                if (index !== -1) {
                    state[index].filter = action.payload.filter
                }
            })
    }
)