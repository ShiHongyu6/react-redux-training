import * as React from 'react';
import { connect } from 'react-redux';
import './todoTask.scss';
import { todoListActions } from '../actions/todoListActions';
import { TaskStatus, TodoTaskType } from '../index';

export type ITodoTaskProps = {
  // 父组件传递
  todoTask : TodoTaskType;
  switchEditingTask : Function

  // connect注入的方法
  switchTodoTaskStatus? : Function;
  deleteTodoTask? : Function
};
@connect(null, mapDispatchToProps)
export default class TodoTask extends React.Component<ITodoTaskProps> {
  constructor(props: ITodoTaskProps) {
    super(props);
  }

  render() {
    const { id, title, content, taskStartTime, taskEndTime, taskStatus } = this.props.todoTask;
    const { switchEditingTask, switchTodoTaskStatus, deleteTodoTask } = this.props;

    /**
     * 这个按钮用来切换task的状态  如果当前状态为new，则切换为done；如果当前状态为down，则切换为new
     */
    const switchBtnClassName = `todoTask__action__btn todoTask__action__btn--${TaskStatus.NEW === taskStatus ? TaskStatus.DONE : TaskStatus.NEW}`;

    return (
      <div className="todoTask">
        <div className={`todoTask__status  todoTask__status--${taskStatus}`}/>

        <div className="todoTask__main" onClick={() => switchEditingTask(id)}>
          <div className="todoTask__title">{title}</div>
          <div className="todoTask__startTime">
            <div className="startTime__content">
              {taskStartTime && (`${taskStartTime.toLocaleTimeString()} ${taskStartTime.toLocaleDateString()}`)}
            </div>

            {   // 如果这个任务的日期和“今天”日期相同  则渲染一个图标用来表示是今天的任务
              taskStartTime.toLocaleDateString() === (new Date()).toLocaleDateString() && (
                  <div className="startTime--today">
                      <i className="icon__today" />
                  </div>
            )}
          </div>
          <div className="todoTask__endTime">
            <div className="endTime__content">
              {taskEndTime && (`${taskEndTime.toLocaleTimeString()} ${taskEndTime.toLocaleDateString()}`)}
            </div>
          </div>
          <div className="todoTask__content">{content}</div>
        </div>
        <div className="todoTask__action">
            {
              // 如果任务已经过期 则不渲染切换状态的按钮
              taskStatus !== TaskStatus.EXPIRED && (
                <div className={switchBtnClassName} onClick={switchTodoTaskStatus(id)}></div>
              )
            }
            <div className="todoTask__action__btn todoTask__action__btn--delete" onClick={deleteTodoTask(id)}></div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    switchTodoTaskStatus : id => () => dispatch(todoListActions.switchTodoTaskStatus(id)),
    deleteTodoTask : id => () => dispatch(todoListActions.deleteTodoTask(id)),
  };
}
