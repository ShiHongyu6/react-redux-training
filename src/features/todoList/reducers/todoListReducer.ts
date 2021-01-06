import { TodoListActionType } from '../actions/todoListActions';
import { TaskStatus, TodoListState } from '../index';
import { Action } from 'Redux';
import { nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
export const initialState:TodoListState = [
  // {
  //   id : '1',
  //   title: 'This is title1',
  //   content: 'This is task1 hello world how are you',
  //   lastUpdateTime: sub((new Date()), { days:10 }),
  //   taskStartTime: sub((new Date()), { days: 2 }),
  //   taskEndTime : sub((new Date()), { days: 1 }),
  //   taskStatus: TaskStatus.NEW,
  //   isDeleted : false,
  // },
  // {
  //   id : '2',
  //   title: 'This is title2',
  //   content: 'This is task2',
  //   lastUpdateTime: sub((new Date()), { days:0 }),
  //   taskStartTime: sub((new Date()), { days: 3 }),
  //   taskEndTime : sub((new Date()), { days: 2 }),
  //   taskStatus: TaskStatus.NEW,
  //   isDeleted : false,
  // },
  // {
  //   id : '3',
  //   title: 'This is title3',
  //   content: 'This is task3',
  //   lastUpdateTime: sub((new Date()), { hours:5 }),
  //   taskStartTime: sub((new Date()), { hours: 4 }),
  //   taskEndTime : sub((new Date()), { hours: 3 }),
  //   taskStatus: TaskStatus.NEW,
  //   isDeleted : false,
  // },
];
/**
 * 注册不同的Action对应的处理函数
 */
const todoListActionHandlers = {
  [TodoListActionType.ADD_TODO_TASK] : (preState, action) => {

    const { content, title, taskStartTime, taskEndTime, nowTime } = action.payload;
    const task = {
      id: nanoid(),
      content,
      title,
      taskStartTime,
      taskEndTime,
      lastUpdateTime: nowTime,
      // 如果当前时间超过了结束之间  则表示task已经过期
      taskStatus: (nowTime > taskEndTime) ? TaskStatus.EXPIRED : TaskStatus.NEW,
      isDeleted: false,
    };
    preState.push({
      ...task,
    });
    return [...preState];
  },
  [TodoListActionType.SWITCH_TODO_TASK_STATUS] : (preState, action) => {
    const cloneState = [...preState];
    const index = cloneState.findIndex(todoTask => todoTask.id === action.payload.id);
    const cloneTask = { ...cloneState[index] };
    cloneTask.taskStatus = TaskStatus.NEW === cloneTask.taskStatus ? TaskStatus.DONE : TaskStatus.NEW;
    cloneState[index] = cloneTask;
    return cloneState;
  },
  [TodoListActionType.DEL_TODO_TASK] : (preState, action) => {
    const cloneState = [...preState];
    const index = cloneState.findIndex(todoTask => todoTask.id === action.payload.id);
    const cloneTask = { ...cloneState[index] };
    cloneTask.isDeleted = true;
    cloneState[index] = cloneTask;
    return cloneState;
  },
  [TodoListActionType.UPDATE_TODO_TASK] : (preState, action) => {
    const cloneState = [...preState];
    const { id, title, content, taskStartTime, taskEndTime, nowTime } = action.payload;
    const updatedTask = {
      id,
      title,
      content,
      taskStartTime,
      taskEndTime,
      // 如果当前时间超过了结束之间  则表示task已经过期
      taskStatus: (nowTime > taskEndTime) ? TaskStatus.EXPIRED : TaskStatus.NEW,
      lastUpdateTime : nowTime,
      isDeleted : false,
    };

    const index = cloneState.findIndex(todoTask => todoTask.id === id);

    console.log(cloneState === preState);
    cloneState[index] = updatedTask;
    return cloneState;
  },
  [TodoListActionType.INIT] : (preState, action) => {
    return action.payload.state;
  },
};
/**
 * todoList的Reducer
 */
export const todoListReducer = function (preState:TodoListState = initialState, action:Action<string>) {
  let actionHandler = null;
  if (action) {
    actionHandler = todoListActionHandlers[action.type];
  }
  return actionHandler ? actionHandler(preState, action) : preState;
};
