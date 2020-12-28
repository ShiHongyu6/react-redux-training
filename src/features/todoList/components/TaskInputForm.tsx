/**
 * 该组件是一个表单，用于创建新的task或者编辑当前task
 */

import * as React from "react";
import { connect } from 'react-redux';
import { TodoTaskType } from "../index";
import { todoListActions } from '../actions/todoListActions'
import './taskInputForm.scss'


/**
 * 用来标识该输入组件用于创建task还是用于更新
 */
export enum HowToUseTaskInputForm {
    CREATE_NEW_TASK = 'new', 
    UPDATE_CREATED_TASK = 'update'
}


export type ITaskInputFormProps = {
    howToUse : HowToUseTaskInputForm,
    todoTask?: TodoTaskType //如果用于更新  则需要接收该todoTask

    switchEditingTask? : Function //用于取消正在编辑的task task的编辑状态记录在TodoList组件的state中  需要这个函数来修改
    updateTodoTask? : Function
    addTodoTask?:Function
}

export type ITaskInputFormState = {
    title : string,
    content : string, 
    taskStartTime_date : string
    taskStartTime_time : string
    taskEndTime_date : string
    taskEndTime_time : string
}

class TaskInputForm extends React.Component<ITaskInputFormProps, ITaskInputFormState> {
    constructor(props: ITaskInputFormProps) {
        super(props);

        const { todoTask } = this.props;
        const startTime = parseDateObjectToString(todoTask && todoTask.taskStartTime);
        const endTime = parseDateObjectToString(todoTask && todoTask.taskEndTime);
        this.state = {
            title : todoTask ? todoTask.title : '',
            content: todoTask ? todoTask.content : '',
            taskStartTime_date : startTime.date || '',
            taskStartTime_time : startTime.time || '',
            taskEndTime_date: endTime.date || '',
            taskEndTime_time: endTime.time || ''
        };

    }


    taskTitleInputChanged(e){
        this.setState({title : e.target.value});
    }

    taskContentInputChanged(e){
        this.setState({content : e.target.value});
    }

    taskStartTimeInputDateChanged(e){
        this.setState({taskStartTime_date : e.target.value});
    }

    taskStartTimeInputTimeChanged(e){
        this.setState({taskStartTime_time : e.target.value})
    }

    taskEndTimeInputDateChanged(e){
        this.setState({taskEndTime_date : e.target.value});
    }

    taskEndTimeInputTimeChanged(e){
        this.setState({taskEndTime_time : e.target.value})
    }


    //点击添加按钮
    addNewTaskClicked() {
        const startDateTimeObject = parseDateTimeStringToDate(this.state.taskStartTime_date, this.state.taskStartTime_time);
        const endDateTimeObject = parseDateTimeStringToDate(this.state.taskEndTime_date, this.state.taskEndTime_time);

        const { addTodoTask } = this.props;
        addTodoTask(this.state.title, this.state.content, startDateTimeObject, endDateTimeObject);
        //添加之后  清空表单
        this.setState({
            title : '',
            content: '',
            taskStartTime_date : '',
            taskStartTime_time : '',
            taskEndTime_date:'',
            taskEndTime_time:''
        });
    }


    //更新Task
    updateTask() {
        const startDateTimeObject = parseDateTimeStringToDate(this.state.taskStartTime_date, this.state.taskStartTime_time);
        const endDateTimeObject = parseDateTimeStringToDate(this.state.taskEndTime_date, this.state.taskEndTime_time);

        const { updateTodoTask, switchEditingTask, todoTask } = this.props;
        updateTodoTask(todoTask.id, this.state.title, this.state.content, startDateTimeObject, endDateTimeObject);
        switchEditingTask();
    }


    render() {

        const { howToUse, switchEditingTask } = this.props;
        
        //如果存在没有输入的输入框 则不能保存
        let canSave:boolean = Boolean(this.state.title) 
            && Boolean(this.state.content) 
            && Boolean(this.state.taskStartTime_date) 
            && Boolean(this.state.taskStartTime_time) 
            && Boolean(this.state.taskEndTime_date) 
            && Boolean(this.state.taskEndTime_time);

        const startDateTimeObject:Date = parseDateTimeStringToDate(this.state.taskStartTime_date, this.state.taskStartTime_time);
        const endDateTimeObject:Date = parseDateTimeStringToDate(this.state.taskEndTime_date, this.state.taskEndTime_time);
        //如果结束时间早于开始时间（不合理） 不能保存
        canSave = canSave && (startDateTimeObject.getTime() < endDateTimeObject.getTime());
        
        return (

            <div className='taskInputForm'>
                <div className='taskInputForm__taskTitle'>
                    <label htmlFor='taskTitleInput' className='taskInputLabel'>Title</label>
                    <input 
                        type='text' 
                        id='taskTitleInput' 
                        className='taskTitleInput' 
                        value={this.state.title} 
                        onChange={e => this.taskTitleInputChanged(e)}
                    />
                </div>
                <div className='taskInputForm__taskContent'>
                    <label htmlFor='taskContentInput' className='taskInputLabel'>Content</label>
                    <textarea 
                        id='taskContentInput' 
                        className='taskContentInput' 
                        value={this.state.content} 
                        onChange={e => this.taskContentInputChanged(e)}
                    />
                </div>
                <div className="taskInputForm__taskTime">
                    <label htmlFor='taskTimeInput-date' className='taskInputLabel'>StartTime</label>
                    <input 
                        type='date' 
                        id='taskTimeInput-date' 
                        className='taskTimeInput-date' 
                        value={this.state.taskStartTime_date}  
                        onChange={(e) => this.taskStartTimeInputDateChanged(e)} 
                    />
                    <input 
                        type='time' 
                        className='taskTimeInput-time' 
                        value={this.state.taskStartTime_time}  
                        onChange={(e) => this.taskStartTimeInputTimeChanged(e)} 
                    />
                </div>

                <div className="taskInputForm__taskTime">
                    <label htmlFor='taskTimeInput-date' className='taskInputLabel'>EndTime</label>
                    <input 
                        type='date' 
                        id='taskTimeInput-date' 
                        className='taskTimeInput-date' 
                        value={this.state.taskEndTime_date}  
                        onChange={(e) => this.taskEndTimeInputDateChanged(e)} 
                    />
                    <input 
                        type='time' 
                        className='taskTimeInput-time' 
                        value={this.state.taskEndTime_time}  
                        onChange={(e) => this.taskEndTimeInputTimeChanged(e)} 
                    />
                </div>
                
                {   //如果这个表单用来创建新的Task  则渲染添加
                    howToUse === HowToUseTaskInputForm.CREATE_NEW_TASK &&( 
                        <button className={`taskInputFormBtn taskInputFormBtn--new`} onClick={() => this.addNewTaskClicked()} disabled={!canSave} />
                )}

                {   //如果这个表单用来创编辑Task 渲染更新和取消按钮
                    howToUse === HowToUseTaskInputForm.UPDATE_CREATED_TASK &&( 
                    <>
                        <button className={`taskInputFormBtn taskInputFormBtn--update`} disabled={!canSave} onClick={() => this.updateTask()}/>
                        <button className={`taskInputFormBtn taskInputFormBtn--cancel`} onClick={() => switchEditingTask()} />
                    </>
                )}
            </div>
        );
    }
}

export default connect(null, (dispatch) => {
    return {
        addTodoTask:(title, content, taskStartTime, taskEndTime) => dispatch(todoListActions.addTodoTask(title, content, taskStartTime, taskEndTime)),
        updateTodoTask:(id, title, content, taskStartTime, taskEndTime) => dispatch(todoListActions.updateTodoTask(id, title, content, taskStartTime, taskEndTime))
    }
},
(stateProps, dispatchProps, ownProps) => {
    const mergedProps = {
        ...stateProps,
        ...ownProps,
        ...dispatchProps
    }

    return mergedProps;
}
)(TaskInputForm);


function parseDateTimeStringToDate(dateString:string, timeString:string) {
    if(!Boolean(dateString) || !Boolean(timeString))
        return null;

    let [year, month, day] = dateString.split('-').map(str => Number(str));
    let [hour, minute] = timeString.split(':').map(str => Number(str));
    return new Date(year, month - 1, day, hour, minute);
}


function parseDateObjectToString(date:Date){

    if(!date) {
        return {date:null, time:null};
    }

    const year = date.getFullYear() + '';
    let month = date.getMonth() + 1 + '';
    if(Number(month) < 10) {
        month = '0' + month;
    }
    let day = date.getDate() + '';
    if(Number(day) < 10) {
        day = '0' + day;
    }
    let hour = date.getHours() + '';
    if(Number(hour) < 10) {
        hour = '0' + hour;
    }

    let minute = date.getMinutes() + '';
    if(Number(minute) < 10) {
        console.log(minute);
        minute = '0' + minute;
    }

    return {date:`${year}-${month}-${day}`, time:`${hour}:${minute}`}
}