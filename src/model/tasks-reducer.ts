import {TasksState} from "../App.tsx";

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>

type ActionType = DeleteTaskAction


const initialState: TasksState = {}

export const taskReducer = (state: TasksState = initialState, action: ActionType): TasksState => {
    switch (action.type) {
        case "DELETE_TASK":
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
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