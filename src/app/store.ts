import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {taskReducer} from '@/features/todolists/model/tasks-reducer'
import {todolistsReducer} from '@/features/todolists/model/todolists-reducer'
import {appReducer} from "./app-reducer.ts";

// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer,
    app: appReducer
})

// создание store
export const store = configureStore({
    reducer: rootReducer,
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch