import { TasksStateType } from "../App";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./tasksReducer";
import { removeTodoListAC } from "./todolistReducer";



let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistID1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistID2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("todolistID2", "2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistID1"].length).toBe(3);
    expect(endState["todolistID2"].length).toBe(2);
    expect(endState["todolistID2"].every(t => t.id != "2")).toBeTruthy();
});

test('correct task should be added to correct array', () => {
  
    const endState: TasksStateType = tasksReducer(startState, addTaskAC("todolistID2", "juce"))

    expect(endState["todolistID1"].length).toBe(3);
    expect(endState["todolistID2"].length).toBe(4);
    expect(endState["todolistID2"][0].id).toBeDefined();
    expect(endState["todolistID2"][0].title).toBe("juce");
    expect(endState["todolistID2"][0].isDone).toBe(false);
});

test('task title should be changed', () => {
  
    const endState: TasksStateType = tasksReducer(startState, changeTaskTitleAC("todolistID2", '2', "juce"))

    expect(endState["todolistID1"].length).toBe(3);
    expect(endState["todolistID2"].length).toBe(3);
    expect(endState["todolistID2"][1].title).toBe("juce");
    expect(endState["todolistID2"][0].title).toBe("bread");
});

test('task status should be changed', () => {
  
    const endState: TasksStateType = tasksReducer(startState, changeTaskStatusAC("todolistID1", '1', true))

    // expect(endState["todolistID1"].length).toBe(3);
    // expect(endState["todolistID2"].length).toBe(3);
    expect(endState["todolistID1"][1].isDone).toBe(true);
});

test('tasks from correct todolist should be removed with todolist by function removeTodoList', () => {
       const action = removeTodoListAC('todolistID1')
       const endState: TasksStateType = tasksReducer(startState, action)
       
       expect(endState["todolistID2"][0].title).toBe('bread')
})