import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todoListReducer } from "./todolistReducer";


let todolistID1: string;
let todolistID2: string;
let startState: Array<TodoListType> = [];


beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();
    startState = [
        {todoListID: todolistID1, title: "What to learn", filter: "all"},
        {todoListID: todolistID2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListReducer(startState, removeTodoListAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].todoListID).toBe(todolistID2);
});



test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todoListReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
});


test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = changeTodoListTitleAC(todolistID2, newTodolistTitle);
    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = changeTodoListFilterAC(todolistID2, newFilter);

    const endState = todoListReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


