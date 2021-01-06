import * as React from 'react';
import './appContainer.scss';
import TodoList from './features/todoList/components/TodoList';

export class App extends React.Component {

  render() {
    return (
      <div className="appContainer">
        <div className="appContainer__header">
          <i className="appContainer__header_icon"></i>
          <span className="header__content">Are You OK ? Let's to do it!</span>
        </div>
        <div className="appContainer__body">
          <TodoList />
        </div>
      </div>
    );
  }
}
