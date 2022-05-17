import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TasksStateType, TaskType } from "./App";

export type TodoListPropsType = {
    id: string
    tasks: Array<TaskType>
    title: string
    filter: FilterValuesType
    removeTask: (todoListID: string, taskID: string) => void
    addTask: (todoListID: string, newTaskTitle: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, value: boolean) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
}



const TodoList = (props: TodoListPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim()) {
            props.addTask(props.id, title)
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
        props.changeFilter(props.id, 'all')
    }
    const onActiveHandler = () => {
        props.changeFilter(props.id, 'active')
    }
    const onCompletedHandler = () => {
        props.changeFilter(props.id, 'completed')
    }


    return (
        <div className="todo-list">
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
                            props.removeTask(props.id, t.id)
                        }
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)
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