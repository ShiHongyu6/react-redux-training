import * as React from "react";
import './appContainerStyleSheet/appContainer.scss'
import TodoList from '../todoList/TodoList'

export type IAppContainerProps = {
    childComponent : typeof TodoList;
}


export default class AppContainer extends React.Component<IAppContainerProps> {
    constructor(props: IAppContainerProps) {
        super(props);
    }

    render() {
        const { childComponent } = this.props;
        return (
            <div className='appContainer'>
                <div className='appContainer__header'>
                    <i className='appContainer__header_icon'></i>
                    <span className='header__content'>Are You OK ? Let's to do it!</span>
                </div>
                <div className='appContainer__body'>
                    {childComponent}
                </div>
            </div>
        );
    }
}
