import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC } from './state/todolistReducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasksReducer';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
  todoListID: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}



function AppWithRedux() {

  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
  const dispatch = useDispatch()


  const addTodoList = (newTodoListTitle: string) => {
    const action = addTodoListAC(newTodoListTitle) 
    dispatch(action)
  }

  const removeTask = (todoListID: string, taskID: string) => {
    const action = removeTaskAC(todoListID, taskID)
    dispatch(action)
  }
  const addTask = (todoListID: string, newTaskTitle: string) => {
    const action = addTaskAC(todoListID, newTaskTitle)
    dispatch(action)
  }
  const changeFilter = (todoListID: string, value: FilterValuesType) => {
    const action = changeTodoListFilterAC(todoListID, value)
    dispatch(action)
  }
  const changeTaskStatus = (todoListID: string, taskID: string, value: boolean) => {
    const action = changeTaskStatusAC(todoListID, taskID, value)
    dispatch(action)
  }
  const changeTodoListTitle = (todoListID: string, newTitle: string) => {
    const action = changeTodoListTitleAC(todoListID, newTitle)
    dispatch(action)
  }
  const changeTaskTitle = (todoListID: string, taskID: string, newTitle: string) => {
    const action = changeTaskTitleAC(todoListID, taskID, newTitle)
    dispatch(action)
  }
  const removeTodoList = (todoListID: string) => {
    const action = removeTodoListAC(todoListID)
    dispatch(action)
  }


  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {
        todoLists.map(tl => {
          let tasksForTodoList = tasks[tl.todoListID]
          if (tl.filter === 'active') {
            tasksForTodoList = tasks[tl.todoListID].filter(t => !t.isDone)
          }
          if (tl.filter === 'completed') {
            tasksForTodoList = tasks[tl.todoListID].filter(t => t.isDone)
          }
          return (
            <TodoList
              key={tl.todoListID}
              id={tl.todoListID}
              title={tl.title}
              filter={tl.filter}
              tasks={tasksForTodoList}
              removeTask={removeTask}
              addTask={addTask}
              changeTaskStatus={changeTaskStatus}
              changeFilter={changeFilter}
              removeTodoList={removeTodoList}
              changeTaskTitle={changeTaskTitle}
              changeTodoListTitle={changeTodoListTitle}
            />
          )
        })
      }

    </div>
  );
}

export default AppWithRedux;
