import {FilterValues, Task} from "../../App.tsx";
import './TodolistItem.scss'
import Button from "../Button/Button.tsx";
import {ChangeEvent, useState} from "react";

type TodolistItemProps = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
}

const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask}: TodolistItemProps) => {
    const [taskTitle, setTaskTitle] = useState('')

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }

    return (
        <div className="todoListBody">
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={onChangeTitleHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
            </div>
            {
                tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul>
                        {tasks.map(m => (
                            <li key={m.id}>
                                <input type="checkbox" checked={m.isDone}/>
                                <span>{m.title}</span>
                                <Button title={"X"} onClick={()=>deleteTask(m.id)}/>
                            </li>
                        ))}
                    </ul>
                )
            }
            <div>
                <Button title={"All"} onClick={()=>changeFilter('all')}/>
                <Button title={"Active"} onClick={()=>changeFilter('active')}/>
                <Button title={"Completed"} onClick={()=>changeFilter('completed')}/>
            </div>
        </div>
    );
};

export default TodolistItem;