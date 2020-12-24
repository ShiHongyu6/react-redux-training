import './todoListStyleSheet/todoList.scss'
import * as React from 'react';
import { connect } from 'react-redux'
import { TaskStatus, TodoTaskType } from './todoTaskSlice'
import TodoTask from './TodoTask'


/**
 * 根据任务状态进行过滤
 */
enum TaskFilter {
    ALL = 'all',
    NEW = 'new',
    DONE = 'done', 
    EXPIRED = 'expired'
}


/**
 * 任务的排序方式
 */
enum TaskOrder {
    NONE ='none',//state中的默认顺序
    CREATION_TIME_ASC = 'creationTimeAsc',//按照创建时间升序
    CREATION_TIME_DES = 'creationTimeDes',//按照创建时间降序
    START_TIME_ASC = 'startTimeAsc',//按照开始时间升序
    START_TIME_DES = 'startTimeDes'//按照开始时间降序
}



type ITodoListProps = {
    todoList : TodoTaskType[];
}

type ITodoListState = {
    filter : TaskFilter
    taskOrder : TaskOrder
}

class TodoList extends React.Component<ITodoListProps, ITodoListState> {
    constructor(props:ITodoListProps) {
        super(props);
        this.state = {
            filter : TaskFilter.ALL,
            taskOrder : TaskOrder.NONE
        };

        this.filterChanged = this.filterChanged.bind(this);
        this.taskOrderChanged = this.taskOrderChanged.bind(this);
    }

    filterChanged(e) {
        this.setState({
            filter : e.target.value
        });
    }

    taskOrderChanged(e) {
        this.setState({
            taskOrder : e.target.value
        })
    }

    render() {
        let { todoList } = this.props;
        /**
         * 根据当前过滤器进行过滤
         */
        todoList = selectTask(todoList, this.state.filter);
        orderTask(todoList, this.state.taskOrder);
        const todoListRendered = todoList.map(todoTask => (<TodoTask todoTask={todoTask} isEditing={false} key={todoTask.id}/>));
        return (
            <div className="todoList">
                <div className="todoList__header">
                    <div className="task__filter">
                        <label htmlFor='task__filter__select'>filter</label>
                        <select id='task__filter__select' className='task__filter__select' name='taskFilter' value={this.state.filter} onChange={this.filterChanged}>
                            <option value={TaskFilter.ALL}>
                                全部
                            </option>
                            <option value={TaskFilter.NEW}>待完成</option>
                            <option value={TaskFilter.DONE}>已完成</option>
                            <option value={TaskFilter.EXPIRED}>已过期</option>
                        </select>
                    </div>

                    <div className='task__order'>
                        <label htmlFor='task__order__select'>order</label>
                        <select id='task__order__select' className='task__order__select' name='taskFilter' value={this.state.taskOrder} onChange={this.taskOrderChanged}>
                            <option value={TaskOrder.NONE}>
                                默认
                            </option>
                            <option value={TaskOrder.CREATION_TIME_ASC}>按创建时间升序</option>
                            <option value={TaskOrder.CREATION_TIME_DES}>按创建时间降序</option>
                            <option value={TaskOrder.START_TIME_ASC}>按开始时间升序</option>
                            <option value={TaskOrder.START_TIME_DES}>按开始时间降序</option>
                        </select>
                    </div>
                </div>

            

                



                <div className="todoList__body">
                    {
                        todoListRendered
                    }
                </div>
            </div>
        );
    }
}

//使用connect包装组件，导出注入数据后的组件
export default connect((state) => {return {todoList:state.todoList};})(TodoList);

function selectTask(todoList:TodoTaskType[], taskFilter:TaskFilter){
    switch(taskFilter) {
        case TaskFilter.NEW : return todoList.filter(task => task.taskStatus === TaskStatus.NEW);
        case TaskFilter.DONE: return todoList.filter(task => task.taskStatus === TaskStatus.DONE);
        case TaskFilter.EXPIRED: return todoList.filter(task => task.taskStatus === TaskStatus.EXPIRED);
        default : return todoList;
    }
}

function orderTask(todoList:TodoTaskType[], taskOrder:TaskOrder) {

    if(TaskOrder.NONE === taskOrder){
        return ;
    }

    switch(taskOrder) {
        case TaskOrder.CREATION_TIME_ASC :
            return todoList.sort((t1, t2) => (t1.creationTime.getTime() - t2.creationTime.getTime()));
        
        case TaskOrder.CREATION_TIME_DES :
            return todoList.sort((t1, t2) => (t2.creationTime.getTime() - t1.creationTime.getTime()));
        
        case TaskOrder.START_TIME_ASC :
            return todoList.sort((t1, t2) => (t1.taskStartTime.getTime() - t2.taskStartTime.getTime()));
        
        case TaskOrder.START_TIME_DES :
            return todoList.sort((t1, t2) => (t2.taskStartTime.getTime() - t1.taskStartTime.getTime()));
    }
}