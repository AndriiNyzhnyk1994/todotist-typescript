import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import AddItemForm from "./AddItemForm";
import { FilterValuesType, TasksStateType, TaskType } from "./App";
import EditableSpan from "./EditableStan";

export type TodoListPropsType = {
    id: string
    tasks: Array<TaskType>
    title: string
    filter: FilterValuesType
    removeTask: (todoListID: string, taskID: string) => void
    addTask: (todoListID: string, newTaskTitle: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, value: boolean) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
}



const TodoList = (props: TodoListPropsType) => {
    
    const addTask = (title: string) => {
        props.addTask(props.id, title)
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
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    return (
        <div key={props.id} className="todo-list">
            <h3>
                <EditableSpan changeTitle={changeTodoListTitle} value={props.title}/>
            </h3>
            <AddItemForm addItem={addTask} />
            <div>
                {
                    props.tasks.map(t => {
                        const removeTask = () => {
                            props.removeTask(props.id, t.id)
                        }
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)
                        }
                        const changeTaskTitle = (newTitle: string) => {
                            props.changeTaskTitle(props.id, t.id, newTitle)
                        }

                        return (
                            <div key={t.id}>
                                <input
                                    type="checkbox"
                                    onChange={changeTaskStatus}
                                    checked={t.isDone}
                                />
                                <EditableSpan changeTitle={changeTaskTitle} value={t.title}/>
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