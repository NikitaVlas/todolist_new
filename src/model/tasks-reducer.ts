import {TasksState} from "../App.tsx";
import {v1} from "uuid";

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>

type ActionType = DeleteTaskAction |
    CreateTaskAction |
    ChangeTaskStatusAction


const initialState: TasksState = {}

export const taskReducer = (state: TasksState = initialState, action: ActionType): TasksState => {
    switch (action.type) {
        case "DELETE_TASK":
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
        case "CREATE_TASK": {
            const newTask = {id: action.payload.taskId, title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "CHANGE_TASK":
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id == action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)}
    }
}

export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'DELETE_TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}

export const createTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'CREATE_TASK',
        payload: {
            todolistId,
            taskId: v1(),
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