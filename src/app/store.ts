import { combineReducers } from "redux";
import configureStore from "./configureStore";
import todoListSlice from '../features/todoList/todoListSlice'
const rootReducer = combineReducers({
    todoList : todoListSlice.reducer,
});


export default configureStore(rootReducer);