import React, { ChangeEvent, useState } from "react";
import { TaskType } from "./App";

export type TodoListPropsType = {
    tasks: Array<TaskType>
    title: string
    removeTask: (taskID: string) => void
    addTask: (newTaskTitle: string) => void
}



const TodoList = (props: TodoListPropsType) => {


    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }


    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <input onChange={onChangeHandler} value={title} className={error ? 'error' : ''}/>
               <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <div>
                {
                    props.tasks.map(t => {
                        const removeTask = () => {
                            props.removeTask(t.id)
                        }

                        return (
                            <div key={t.id}>
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                />
                                <span>{t.title}</span>
                                <button onClick={removeTask}>x</button>
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