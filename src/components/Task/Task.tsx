import * as React from "react";
import { ITaskProps } from './Task.types';
import './Task.css';
import * as moment from 'moment';

export const Task = (props: ITaskProps) => {
    const { task, onClick } = props;
    const style: React.CSSProperties = {
        backgroundColor: 'yellow'
    }
    const changeTaskStatus = () => onClick(task.id, !task.isDone);
    let is24HoursBeforeDeadline = false;
    if (task.expiryDate) {
        const diff = task.expiryDate.diff(moment(), "h");
        is24HoursBeforeDeadline = (diff > 0 && diff < 24 )
    }
    
    return (
        <div className='taskContainer'>
            <input type='checkbox' onChange={changeTaskStatus} checked={task.isDone}/>
            <h2 style={is24HoursBeforeDeadline ? style : {}}>{task.title}</h2>
            <span>{task.expiryDate && task.expiryDate.toLocaleString()}</span>
        </div>
    );
}