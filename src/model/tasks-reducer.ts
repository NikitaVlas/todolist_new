import {TasksState} from "../app/App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";

export const deleteTaskAC = createAction<{ id: string, taskId: string }>('tasks/deleteTask')
export const createTaskAC = createAction('tasks/createTask', (id: string, title: string) => {
    return {payload: {id, title, taskId: nanoid()}}
})
export const changeTaskAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTask')
export const changeTitleTaskAC = createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTitleTask')

const initialState: TasksState = {}

export const taskReducer = createReducer(initialState, builder => {
    builder.addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id]
    })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        }).addCase(deleteTaskAC, (state, action) => {
        if (state[action.payload.id]) {
            state[action.payload.id] = state[action.payload.id].filter(task => task.id !== action.payload.taskId);
        }
    }).addCase(createTaskAC, (state, action) => {
        if (!state[action.payload.id]) {
            state[action.payload.id] = []; // Если вдруг тудулиста нет, создаём массив
        }
        state[action.payload.id].unshift({
            id: action.payload.taskId,
            title: action.payload.title,
            isDone: false
        });
    }).addCase(changeTaskAC, (state, action) => {
        const tasks = state[action.payload.todolistId]; // Получаем массив задач
        if (tasks) {
            const task = tasks.find(task => task.id === action.payload.taskId); // Ищем задачу
            if (task) {
                task.isDone = action.payload.isDone; // Меняем статус
            }
        }
    }).addCase(changeTitleTaskAC, (state, action) => {
        const tasks = state[action.payload.todolistId]; // Получаем массив задач
        if (tasks) {
            const task = tasks.find(task => task.id === action.payload.taskId); // Ищем задачу
            if (task) {
                task.title = action.payload.title; // Меняем title
            }
        }
    })
})