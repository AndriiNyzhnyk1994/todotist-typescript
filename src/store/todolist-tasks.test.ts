import { TasksStateType, TodoListType } from "../App";
import { tasksReducer } from "./tasksReducer";
import { addTodoListAC, todoListReducer } from "./todolistReducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].todoListID;

    expect(idFromTasks).toBe(action.newTodoListID);
    expect(idFromTodolists).toBe(action.newTodoListID);
});
