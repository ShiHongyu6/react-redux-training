// Task的状态
export enum TaskStatus {
    NEW = 'new', // 新创建的任务  状态为done的任务可以转换为new
    DONE = 'done', // 已经完成的任务 状态为new的任务可以转换为done
    EXPIRED = 'expired', // 过期的任务 可以通过修改开始时间转换为new
}

// store.taskList每一项的类型
export type TodoTaskType = {
  id : string,
  title : string,
  content : string,
  lastUpdateTime : Date,
  taskStartTime : Date,
  taskEndTime : Date,
  taskStatus : TaskStatus,
  isDeleted : boolean,    // 是否已经被删除
};

// store.taskList的类型
export type TodoListState = TodoTaskType[];
