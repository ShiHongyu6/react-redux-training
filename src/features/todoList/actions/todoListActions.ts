export enum TodoListActionType {
    ADD_TODO_TASK = 'TodoList/addTodoTask',
    DEL_TODO_TASK = 'TodoList/delTodoTask',
    UPDATE_TODO_TASK = 'TodoList/updateTodoTask',
    SWITCH_TODO_TASK_STATUS = 'TodoList/switchTodoTaskStatus',
    INIT = 'TodoList/initTodoList',
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
      nowTime : new Date(),
    };
    return { type:TodoListActionType.ADD_TODO_TASK, payload };
  },
  switchTodoTaskStatus : (id) => {
    const payload = {
      id,
    };
    return { type:TodoListActionType.SWITCH_TODO_TASK_STATUS, payload };
  },
  deleteTodoTask : (id) => {
    const payload = {
      id,
    };
    return { type:TodoListActionType.DEL_TODO_TASK, payload };
  },
  updateTodoTask : (id, title, content, taskStartTime, taskEndTime) => {
    const payload = {
      id,
      title,
      content,
      taskStartTime,
      taskEndTime,
      nowTime : new Date(),
    };
    return { type:TodoListActionType.UPDATE_TODO_TASK, payload };
  },
  initTodoList : (state) => {
    const payload = { state };
    return { type:TodoListActionType.INIT, payload };
  },
};
