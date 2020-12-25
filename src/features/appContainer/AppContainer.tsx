import * as React from "react";
import './appContainer.scss'
import TodoList from '../todoList/components/TodoList'

export type IAppContainerProps = {
    
}


export default class AppContainer extends React.Component<IAppContainerProps> {
    constructor(props: IAppContainerProps) {
        super(props);
    }

    render() {
        return (
            <div className='appContainer'>
                <div className='appContainer__header'>
                    <i className='appContainer__header_icon'></i>
                    <span className='header__content'>Are You OK ? Let's to do it!</span>
                </div>
                <div className='appContainer__body'>
                    <TodoList />
                </div>
            </div>
        );
    }
}
