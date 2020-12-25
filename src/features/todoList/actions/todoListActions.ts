export enum TodoListActionType {
    ADD_TODO_TASK = 'TodoList/addTodoTask',
    DEL_TODO_TASK = 'TodoList/delTodoTask',
    SWITCH_TODO_TASK_STATUS = 'TodoList/switchTodoTaskStatus'
}


/**
 * Action工厂
 */
export const todoListActions = {
    addTodoTask : (title, content, taskStartTime, taskEndTime) => {
        const payload = {
            title,
            content,
            taskStartTime,
            taskEndTime,
            nowTime : new Date()
        }
        return {type:TodoListActionType.ADD_TODO_TASK, payload};
    }, 
    switchTodoTaskStatus : id => {
        const payload = {
            id
        }
        return {type:TodoListActionType.SWITCH_TODO_TASK_STATUS, payload};
    },
    deleteTodoTask : id => {
        const payload ={
            id
        }
        return {type:TodoListActionType.DEL_TODO_TASK, payload};
    }
};
