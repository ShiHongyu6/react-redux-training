import { combineReducers } from "redux";
import configureStore from "./configureStore";
import { todoListReducer } from '../features/todoList/reducers/todoListReducer'
const rootReducer = combineReducers({
    todoList : todoListReducer,
});


export default configureStore(rootReducer);