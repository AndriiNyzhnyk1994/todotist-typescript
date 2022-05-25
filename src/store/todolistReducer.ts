import { TLSSocket } from "tls";
import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'


export type ActionType = RemoveTodoListActionType 
| AddTodoListActionType 
| ChangeTodoListTitleActionType
| ChangeTodoListFilterActionType


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    newTodoListID: string
    newTodoListTitle: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListID: string
    newTitle: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todoListID: string
    newFilter: FilterValuesType
}

const initialState: Array<TodoListType> =  []


export const todoListReducer = (state: Array<TodoListType> = initialState, action: ActionType) => {
    switch (action.type) {
        case REMOVE_TODOLIST: {
            return state.filter(tl => tl.todoListID !== action.todoListID)
        }
        case ADD_TODOLIST: {
            const newTodoList: TodoListType = { todoListID: action.newTodoListID, title: action.newTodoListTitle, filter: 'all' }
            return [newTodoList, ...state]
        }
        case CHANGE_TODOLIST_TITLE: {
            return state.map(tl => {
                if(tl.todoListID === action.todoListID) {
                    return {...tl, title: action.newTitle}
                }
                return tl
            })
        }
        case CHANGE_TODOLIST_FILTER: {
            return state.map(tl => {
                if(tl.todoListID === action.todoListID) {
                    return {...tl, filter: action.newFilter}
                }
                return tl
            })
        }
        default: return state
    }
}


export const removeTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {type: REMOVE_TODOLIST, todoListID}
}
export const addTodoListAC = (newTodoListTitle: string): AddTodoListActionType => {
    return {type: ADD_TODOLIST,newTodoListID: v1(), newTodoListTitle}
}
export const changeTodoListTitleAC = (todoListID: string, newTitle: string): ChangeTodoListTitleActionType => {
    return {type: CHANGE_TODOLIST_TITLE, todoListID, newTitle}
}
export const changeTodoListFilterAC = (todoListID: string, newFilter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: CHANGE_TODOLIST_FILTER, todoListID, newFilter}
}