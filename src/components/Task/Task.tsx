import * as React from "react";
import { ITaskProps } from './Task.types';
import './Task.css';
import * as moment from 'moment';


function shouldTaskBeHighlighted (taskDeadline: moment.Moment | undefined, currentDate: moment.Moment, isDone: boolean): boolean {
    if (taskDeadline && !isDone) {
        const diff = taskDeadline.diff(currentDate, "h");
        return (diff >= 0 && diff < 24 )
    }
    return false;
}

export const Task = (props: ITaskProps) => {
    const { task, onClick } = props;
    const style: React.CSSProperties = {
        color: 'yellow'
    }
    const changeTaskStatus = () => onClick(task.id, !task.isDone);
    const is24HoursBeforeDeadline = shouldTaskBeHighlighted(task.expiryDate, moment(), task.isDone);    
    return (
        <div className='taskContainer'>
            <input type='checkbox' onChange={changeTaskStatus} checked={task.isDone}/>
            <h2>{task.title}</h2>
            <span style={is24HoursBeforeDeadline ? style : {}}>{task.expiryDate ? task.expiryDate.format("YYYY-MM-DD hh:mm") : 'No expiration date.'}</span>
        </div>
    );
}