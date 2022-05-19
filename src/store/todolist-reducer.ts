import { TodoListType } from "../App";

export type ActionType = RemoveTodoListActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}


export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch(action.type){
        case 'REMOVE-TODOLIST': {
            return state
        }
        default: return state
    }
}