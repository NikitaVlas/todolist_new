import {TasksState} from "../App.tsx";
import {v1} from "uuid";

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>

type ActionType = DeleteTaskAction |
    CreateTaskAction


const initialState: TasksState = {}

export const taskReducer = (state: TasksState = initialState, action: ActionType): TasksState => {
    switch (action.type) {
        case "DELETE_TASK":
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
        case "CREATE_TASK": {
            const newTask = {id: action.payload.taskId, title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
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