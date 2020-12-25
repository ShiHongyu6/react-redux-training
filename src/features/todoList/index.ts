//Task的状态
export enum TaskStatus {
    NEW = 'new',//新创建的任务  状态为done的任务可以转换为new
    DONE = 'done',//已经完成的任务 状态为new的任务可以转换为done
    EXPIRED = 'expired'//过期的任务 可以通过修改开始时间转换为new
};

//store.taskList每一项的类型
export type TodoTaskType = {
    id : string, 
    title : string,
    content : string, 
    creationTime : Date, 
    taskStartTime : Date, 
    taskStatus : TaskStatus
};

//store.taskList的类型
export type TodoListState = TodoTaskType[];  



import { sub } from 'date-fns'
export const initialState:TodoListState = [
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
