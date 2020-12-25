import { TodoListActionType } from '../actions/todoListAction'
import { TaskStatus, TodoListState, initialState } from '../index'
import { Action } from 'Redux'
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
export const todoListReducer = function(preState:TodoListState = initialState, action:Action<string>) {
    let actionHandler = null;
    if(action){
        actionHandler = todoListActionHandlers[action.type];
    }
    return actionHandler ? actionHandler(preState, action) : preState;
}

