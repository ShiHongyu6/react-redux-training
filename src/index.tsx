import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './App';
import store from './app/store';
import { todoListActions } from './features/todoList/actions/todoListActions';

const root = document.getElementById('root');
root ? render(
    <Provider store={store}>
        <App />
    </Provider>
, root) : false;

import  Accessor  from './HttpAccessor/Accessor';
const accessor = new Accessor('http://localhost:8080');

accessor.access(undefined, (response) => {
  const state = JSON.parse(response);
  for (const task of state) {
    task.lastUpdateTime = new Date(task.lastUpdateTime);
    task.taskStartTime = new Date(task.taskStartTime);
    task.taskEndTime = new Date(task.taskEndTime);
  }
  store.dispatch(todoListActions.initTodoList(state));
});
