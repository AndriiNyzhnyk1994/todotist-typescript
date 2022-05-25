import { v1 } from "uuid";
import { TasksStateType, TaskType } from "../App";
import { AddTodoListActionType, ADD_TODOLIST, RemoveTodoListActionType, REMOVE_TODOLIST } from "./todolistReducer";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHAGNE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const CHAGNE_TASK_STATUS = 'CHANGE-TASK-STATUS'

export type TasksReducerActionType = RemoveTaskActionType 
| AddTaskActionType 
| ChangeTaskTitleActionType
| ChangeTaskStatusActionType
| AddTodoListActionType
| RemoveTodoListActionType

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListID: string
    taskID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todoListID: string
    newTaskTitle: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todoListID: string
    taskID: string
    newTaskTitle: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todoListID: string
    taskID: string
    newTaskStatus: boolean
}


const initialState = {
    
}



export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionType) => {
    switch (action.type) {
        case REMOVE_TASK: {
            return { ...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID) }
        }
        case ADD_TASK: {
            let newTask: TaskType = { id: v1(), title: action.newTaskTitle, isDone: false }
            let stateCopy = {...state}
            let todoListTasks = stateCopy[action.todoListID]
            stateCopy[action.todoListID] = [newTask, ...todoListTasks]
            return stateCopy
        }
        case CHAGNE_TASK_TITLE: {
            let stateCopy = {...state}
            let task = stateCopy[action.todoListID].find(t => t.id === action.taskID) 
            if(task) {
                task.title = action.newTaskTitle
            }
            return {...stateCopy}


            // stateCopy[action.todoListID] = todoListTasks.map(t => t.id === action.taskID 
            //     ? {...t, title: action.newTaskTitle} 
            //     : t)
            // return {stateCopy}
        }
        case CHAGNE_TASK_STATUS: {
            let stateCopy = {...state}
            let task = stateCopy[action.todoListID].find(t => t.id === action.taskID) 
            if(task) {
                task.isDone = action.newTaskStatus
            }
            return {...stateCopy}
        }
        case ADD_TODOLIST: {
            return { [action.newTodoListID]: [], ...state}
        }
        case REMOVE_TODOLIST: {
            let stateCopy = {...state}
            delete stateCopy[action.todoListID]
            return stateCopy
        }
        default: return state
    }
}


export const removeTaskAC = (todoListID: string, taskID: string): RemoveTaskActionType => {
    return { type: REMOVE_TASK, todoListID, taskID }
}
export const addTaskAC = (todoListID: string, newTaskTitle: string): AddTaskActionType => {
    return { type: ADD_TASK, todoListID, newTaskTitle }
}
export const changeTaskTitleAC = (todoListID: string, taskID: string, newTaskTitle: string): ChangeTaskTitleActionType => {
    return { type: CHAGNE_TASK_TITLE, todoListID, taskID, newTaskTitle }
}
export const changeTaskStatusAC = (todoListID: string, taskID: string, newTaskStatus: boolean): ChangeTaskStatusActionType => {
    return { type: CHAGNE_TASK_STATUS, todoListID, taskID, newTaskStatus}
}