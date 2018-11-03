import * as React from "react";
import { ITaskProps } from './Task.types';

export const Task = (props: ITaskProps) => {
    const { task, onClick } = props;
    const changeTaskStatus = () => onClick(task.id, !task.isDone);
    return (
        <div>
            <input type='checkbox' onChange={changeTaskStatus} checked={task.isDone}/>
            <h2>{task.title}</h2>
            <span>{task.expiryDate}</span>
        </div>
    );
}