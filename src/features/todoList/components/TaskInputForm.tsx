/**
 * 该组件是一个表单，用于创建新的task或者编辑当前task
 */

import * as React from "react";
import { connect } from 'react-redux';
import { TodoTaskType } from "../index";


/**
 * 用来标识该输入组件用于创建task还是用于更新
 */
enum HowToUseTaskInputForm {
    CREATE_NEW_TASK = 'new', 
    UPDATE_CREATED_TASK = 'update'
}


export type ITaskInputFormProps = {
    howToUse : HowToUseTaskInputForm,
    todoTask?: TodoTaskType //如果用于更新  则需要接收该todoTask
}


class TaskInputForm extends React.Component<ITaskInputFormProps> {
    constructor(props: ITaskInputFormProps) {
        super(props);
    }

    render() {
        return (
            <div className='taskInputForm'>
                <div className='taskInputForm__taskTitle'>
                    <label htmlFor='taskTitleInput'>Title</label>
                    <input type='text' id='taskTitleInput' className='taskTitleInput'/>
                </div>
                <div className='taskInputForm__taskContent'>
                    <label htmlFor='taskContentInput'>Content</label>
                    <input type='textarea' id='taskContentInput' className='taskContentInput' />
                </div>
            </div>
        );
    }
}

export default connect(null, (dispatch) => {
    return {
        
    }
})(TaskInputForm);