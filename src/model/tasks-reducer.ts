import {Task, TasksState} from "../app/App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";

export const deleteTaskAC = createAction<{ id: string, taskId: string }>('tasks/deleteTask')
export const createTaskAC = createAction<{todolistId: string, title: string}>('tasks/createTask')
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
        const newTask: Task = {title: action.payload.title, isDone: false, id: nanoid()}
        state[action.payload.todolistId].unshift(newTask)
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