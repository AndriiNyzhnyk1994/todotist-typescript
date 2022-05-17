import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "./App";

export type TodoListPropsType = {
    tasks: Array<TaskType>
    title: string
    filter: FilterValuesType
    removeTask: (taskID: string) => void
    addTask: (newTaskTitle: string) => void
    changeTaskStatus: (taskID: string, value: boolean) => void
    changeFilter: (value: FilterValuesType) => void
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
    const onKeypressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') addTask()
    }
    
    const onAllHandler = () => {
        props.changeFilter('all')
    }
    const onActiveHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedHandler = () => {
        props.changeFilter('completed')
    }


    return (
        <div>
            <div className="addItemForm">
                <h3>{props.title}</h3>
                <input 
                onChange={onChangeHandler} 
                value={title} 
                className={error ? 'error' : ''}
                onKeyDown={onKeypressHandler}
                />
               <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <div>
                {
                    props.tasks.map(t => {
                        const removeTask = () => {
                            props.removeTask(t.id)
                        }
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
                        }

                        return (
                            <div key={t.id}>
                                <input
                                    type="checkbox"
                                    onChange={changeTaskStatus}
                                    checked={t.isDone}
                                />
                                <span>{t.title}</span>
                                <button onClick={removeTask}>x</button>
                            </div>
                        )
                    })
                }
            </div>
            <div className='filter-buttons'>
                <button className={props.filter ==='all' ? 'active-class' : ''} onClick={onAllHandler}>All</button>
                <button className={props.filter ==='active' ? 'active-class' : ''} onClick={onActiveHandler}>Active</button>
                <button className={props.filter ==='completed' ? 'active-class' : ''} onClick={onCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}




export default TodoList