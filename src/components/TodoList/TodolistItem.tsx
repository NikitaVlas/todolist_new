import {FilterValues, Task, Todolist} from "../../App.tsx";
import './TodolistItem.scss'
import Button from "../Button/Button.tsx";
import React, {ChangeEvent, useState} from "react";

type TodolistItemProps = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
}

const TodolistItem = ({
                          todolist: {id, title, filter},
                          tasks,
                          deleteTask,
                          changeFilter,
                          createTask,
                          changeTaskStatus,
                          deleteTodolist
                      }: TodolistItemProps) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const onKeyDownEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler(id)
        }
    }

    const createTaskHandler = (id: string) => {
        const trimmedTitle = taskTitle.trim()
        if (taskTitle.trim() !== '') {
            createTask(id, trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(id, taskId, newStatusValue)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    return (
        <div className="todoListBody">
            <div className={'container'}>
                <h3>{title}</h3>
                <Button title={'x'} onClick={deleteTodolistHandler}/>
            </div>
            <div>
                <input className={error ? 'error' : ''}
                       value={taskTitle}
                       onChange={onChangeTitleHandler}
                       onKeyDown={onKeyDownEnter}
                />
                <Button title={'+'} onClick={() => createTaskHandler(id)}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {
                tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul>
                        {tasks.map(m => (
                            <li key={m.id} className={m.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={m.isDone}
                                       onChange={(e) => changeTaskStatusHandler(m.id, e)}/>
                                <span>{m.title}</span>
                                <Button title={"X"} onClick={() => deleteTask(id, m.id)}/>
                            </li>
                        ))}
                    </ul>
                )
            }
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title={"All"} onClick={() => changeFilterHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={"Active"}
                        onClick={() => changeFilterHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={"Completed"}
                        onClick={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    );
};

export default TodolistItem;