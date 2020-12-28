//Task的状态
export enum TaskStatus {
    NEW = 'new',//新创建的任务  状态为done的任务可以转换为new
    DONE = 'done',//已经完成的任务 状态为new的任务可以转换为done
    EXPIRED = 'expired'//过期的任务 可以通过修改开始时间转换为new
};

//store.taskList每一项的类型
export type TodoTaskType = {
    id : string
    title : string
    content : string
    lastUpdateTime : Date 
    taskStartTime : Date
    taskEndTime : Date
    taskStatus : TaskStatus
    isDeleted : boolean    //是否已经被删除
};

//store.taskList的类型
export type TodoListState = TodoTaskType[];  



import { sub } from 'date-fns'
export const initialState:TodoListState = [
    {
        id : '1',
        title: 'This is title1', 
        content: 'This is task1 hello world how are you',
        lastUpdateTime: sub((new Date()), {days:10}), 
        taskStartTime: sub((new Date()), {days: 2}),
        taskEndTime : sub((new Date()), {days: 1}),
        taskStatus: TaskStatus.NEW, 
        isDeleted : false
    },
    {
        id : '2',
        title: 'This is title2', 
        content: 'This is task2',
        lastUpdateTime: sub((new Date()), {days:0}),
        taskStartTime: sub((new Date()), {days: 3}),
        taskEndTime : sub((new Date()), {days: 2}),
        taskStatus: TaskStatus.NEW,
        isDeleted : false
    },
    {
        id : '3',
        title: 'This is title3', 
        content: 'This is task3',
        lastUpdateTime: sub((new Date()), {hours:5}), 
        taskStartTime: sub((new Date()), {hours: 4}),
        taskEndTime : sub((new Date()), {hours: 3}),
        taskStatus: TaskStatus.NEW, 
        isDeleted : false
    }
];
