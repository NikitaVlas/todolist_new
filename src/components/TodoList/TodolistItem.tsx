import {FilterValues, Task, Todolist} from "../../App.tsx";
import './TodolistItem.scss'
import Button from "../Button/Button.tsx";
import {ChangeEvent} from "react";
import CreateItemForm from "../ItemForm/CreateItemForm.tsx";

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


    const createTaskHandler = (title: string) => {
        createTask(id, title)
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
                <CreateItemForm onCreateItem={createTaskHandler}/>
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