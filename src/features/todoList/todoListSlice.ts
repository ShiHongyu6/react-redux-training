import { Action } from 'redux';
import { TodoTaskType } from './todoTaskSlice';
import { TaskStatus } from './todoTaskSlice'
import { nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
export type TodoListState = TodoTaskType[];


const initialState:TodoListState = [
    {
        id : '1',
        title: 'This is title1', 
        content: 'This is task1 hello world how are you',
        creationTime: sub((new Date()), {minutes:10}), 
        taskStartTime: new Date(), 
        taskStatus: TaskStatus.NEW
    },
    {
        id : '2',
        title: 'This is title2', 
        content: 'This is task2',
        creationTime: sub((new Date()), {minutes:15}),
        taskStartTime: new Date(), 
        taskStatus: TaskStatus.NEW
    },
    {
        id : '3',
        title: 'This is title3', 
        content: 'This is task3',
        creationTime: sub((new Date()), {minutes:5}), 
        taskStartTime: new Date(), 
        taskStatus: TaskStatus.NEW
    }
];

enum TodoListActionType {
    ADD_TODO_TASK = 'TodoList/addTodoTask',
    SWITCH_TODO_TASK_STATUS = 'TodoList/switchTodoTaskStatus'
}


/**
 * Action工厂
 */
const todoListActions = {
    addTodoTask : (content, title, taskStartTime) => {
        const payload = {
            id: nanoid(),
            content,
            title,
            taskStartTime,
            creationTime: new Date(), 
            taskStatus: TaskStatus.NEW
        }
        return {type:TodoListActionType.ADD_TODO_TASK, payload};
    }, 
    switchTodoTaskStatus : id => {
        const payload = {
            id
        }
        return {type:TodoListActionType.SWITCH_TODO_TASK_STATUS, payload};
    }
};



/**
 * 注册不同的Action对应的处理函数
 */
const todoListActionHandlers = {
    [TodoListActionType.ADD_TODO_TASK] : (preState, action) => {
        preState.push({
            ...(action.payload)
        });
        return [...preState];
    },
    [TodoListActionType.SWITCH_TODO_TASK_STATUS] : (preState, action) => {
        const cloneState = [...preState];
        const index = cloneState.findIndex(todoTask => todoTask.id === action.payload.id);
        const cloneTask = {...cloneState[index]};
        cloneTask.taskStatus = TaskStatus.NEW === cloneTask.taskStatus ? TaskStatus.DONE : TaskStatus.NEW;
        cloneState[index] = cloneTask;
        return cloneState;
    }
};
/**
 * todoList的Reducer
 */
const todoListReducer = function(preState:TodoListState = initialState, action:Action<string>) {
    let actionHandler = null;
    if(action){
        actionHandler = todoListActionHandlers[action.type];
    }
    return actionHandler ? actionHandler(preState, action) : preState;
}


export default {actions : todoListActions, reducer : todoListReducer}