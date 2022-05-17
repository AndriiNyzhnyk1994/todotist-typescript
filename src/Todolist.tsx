import React from "react";
import { TaskType } from "./App";

export type TodoListPropsType = {
    tasks: Array<TaskType>
    title: string
}



const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <input />
                <button>+</button>
            </div>
            <div>
                {
                    props.tasks.map(t => {
                        return (
                            <div key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button>x</button>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}




export default TodoList