import {Task} from "../App.tsx";

type TodolistItemProps = {
    title: string
    tasks: Task[]
}

const TodolistItem = ({title, tasks}: TodolistItemProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(m => (
                    <li key={m.id}>
                        <input type="checkbox" checked={m.isDone}/>
                        <span>{m.title}</span>
                    </li>
                ))}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default TodolistItem;