import * as React from "react";
import { ITaskProps } from './Task.types';
import './Task.css';

export const Task = (props: ITaskProps) => {
    const { task, onClick } = props;
    const changeTaskStatus = () => onClick(task.id, !task.isDone);
    return (
        <div className='taskContainer'>
            <input type='checkbox' onChange={changeTaskStatus} checked={task.isDone}/>
            <h2>{task.title}</h2>
            <span>{task.expiryDate && task.expiryDate.toLocaleString()}</span>
        </div>
    );
}