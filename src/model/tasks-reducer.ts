import {TasksState} from "../app/App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";

export const deleteTaskAC = createAction<{ id: string, taskId: string }>('tasks/deleteTask')
export const createTaskAC = createAction('tasks/createTask', (id: string, title: string) => {
    return {payload: {id, title, taskId: nanoid()}}
})

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
        state[action.payload.id].push({
            id: action.payload.taskId,
            title: action.payload.title,
            isDone: false
        });
    })
})

export const taskReducer2 = (state: TasksState = initialState, action: ActionType): TasksState => {
    switch (action.type) {
        case "CHANGE_TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id == action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task)
            }
        case "CHANGE_TITLE_TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    title: action.payload.title
                } : task)
            }
        case "CREATE_TODOLIST_TASKS": {
            return {...state, [action.payload.id]: []};
        }
        default:
            return state
    }
}

export const createTaskAC2 = (todolistId: string, title: string) => {
    return {
        type: 'CREATE_TASK',
        payload: {
            todolistId,

            title
        }
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK',
        payload: {
            todolistId,
            taskId,
            isDone
        }
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE_TITLE_TASK',
        payload: {
            todolistId,
            taskId,
            title
        }
    } as const
}

export const createTodolistTasksAC = (id: string) => {
    return {
        type: "CREATE_TODOLIST_TASKS",
        payload: {
            id
        }
    } as const;
};