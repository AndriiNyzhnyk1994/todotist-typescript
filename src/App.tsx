import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';


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



function App() {

  const todoListID_01 = v1()
  const todoListID_02 = v1()


  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { todoListID: todoListID_01, title: 'Movies', filter: 'all' },
    { todoListID: todoListID_02, title: 'Books', filter: 'all' },
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todoListID_01]: [
      { id: v1(), title: 'Terminator', isDone: true },
      { id: v1(), title: 'Furminator', isDone: false },
      { id: v1(), title: 'Gladiator', isDone: true },
      { id: v1(), title: 'Penetrator', isDone: false },
    ],
    [todoListID_02]: [
      { id: v1(), title: 'The Hobbit', isDone: true },
      { id: v1(), title: 'Angels And Demons', isDone: false },
      { id: v1(), title: 'Eclipse', isDone: true },
      { id: v1(), title: 'The Lovely Bones', isDone: false },
    ]
  })


  const addTodoList = (newTodoListTitle: string) => {
    const newTodoListID = v1()
    const newTodoList: TodoListType = { todoListID: newTodoListID, title: newTodoListTitle, filter: 'all' }
    setTodoLists([newTodoList, ...todoLists])
    setTasks({ [newTodoListID]: [], ...tasks })
  }

  const removeTask = (todoListID: string, taskID: string) => {
    setTasks({
      ...tasks,
      [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)
    })
  }
  const addTask = (todoListID: string, newTaskTitle: string) => {
    const newTask: TaskType = { id: v1(), title: newTaskTitle, isDone: false }
    const todoListTasks = tasks[todoListID]
    tasks[todoListID] = [newTask, ...todoListTasks]
    setTasks({ ...tasks })
  }
  const changeFilter = (todoListID: string, value: FilterValuesType) => {
    const todoList = todoLists.find(tl => tl.todoListID === todoListID)
    if (todoList) {
      todoList.filter = value
      setTasks({ ...tasks })
    }
  }
  const changeTaskStatus = (todoListID: string, taskID: string, value: boolean) => {
    const task = tasks[todoListID].find(t => t.id === taskID)
    if (task) {
      task.isDone = value
      setTasks({ ...tasks })
    }
  }
  const changeTodoListTitle = (todoListID: string, newTitle: string) => {
      let todoList = todoLists.find(tl => tl.todoListID === todoListID)
      if(todoList) {
        todoList.title = newTitle
        setTodoLists([...todoLists])
      }
  }
  const changeTaskTitle = (todoListID: string, taskID: string, newTitle: string) => {
    let task = tasks[todoListID].find(t => t.id === taskID)
    if(task) {
      task.title = newTitle
      setTasks({...tasks})
    }
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
              changeTaskTitle={changeTaskTitle}
              changeTodoListTitle={changeTodoListTitle}
            />
          )
        })
      }

    </div>
  );
}

export default App;
