import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './Todolist';
import { v1 } from 'uuid';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'




function App() {


  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'Terminator', isDone: true },
    { id: v1(), title: 'Furminator', isDone: false },
    { id: v1(), title: 'Gladiator', isDone: true },
    { id: v1(), title: 'Penetrator', isDone: false },
  ])
  let [filter, setFilter] = useState<FilterValuesType>('all')


  const removeTask = (taskID: string) => {
    setTasks(tasks.filter(t => t.id !== taskID))
  }
  const addTask = (newTaskTitle: string) => {
    const newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
    setTasks([newTask, ...tasks])
  }
  const changeFilter = (value: FilterValuesType) => {
    setFilter(value)
  }
  const changeTaskStatus = (taskID: string, value: boolean) => {
    const task = tasks.find(t => t.id === taskID)
    if(task) {
      task.isDone = value
      setTasks([...tasks])
    }
  }


  let tasksForTodoList = tasks
  if(filter === 'active') {
    tasksForTodoList = tasks.filter(t => !t.isDone)
  }
  if(filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone)
  }


  return (
    <div className="App">
      <TodoList
        title={'Movies'}
        filter={filter}
        tasks={tasksForTodoList}
        removeTask={removeTask}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
