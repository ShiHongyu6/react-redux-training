import { nanoid } from '@reduxjs/toolkit'
import { TaskStatus } from '../index'

export enum TodoListActionType {
    ADD_TODO_TASK = 'TodoList/addTodoTask',
    SWITCH_TODO_TASK_STATUS = 'TodoList/switchTodoTaskStatus'
}


/**
 * Action工厂
 */
export const todoListActions = {
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
