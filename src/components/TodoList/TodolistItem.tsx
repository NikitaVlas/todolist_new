import {FilterValues, Task} from "../../App.tsx";
import './TodolistItem.scss'
import Button from "../Button/Button.tsx";

type TodolistItemProps = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: number) => void
    changeFilter: (filter: FilterValues) => void
}

const TodolistItem = ({title, tasks, deleteTask, changeFilter}: TodolistItemProps) => {
    return (
        <div className="todoListBody">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
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