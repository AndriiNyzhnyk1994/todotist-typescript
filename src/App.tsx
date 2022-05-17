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




function App() {


  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: 'Terminator', isDone: true},
    {id: v1(), title: 'Furminator', isDone: false},
    {id: v1(), title: 'Gladiator', isDone: true},
    {id: v1(), title: 'Penetrator', isDone: false},
  ])





  return (
    <div className="App">
      <TodoList 
        title={'Movies'}
          tasks={tasks}
        />
    </div>
  );
}

export default App;
