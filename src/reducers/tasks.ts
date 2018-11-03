import { ITask } from 'src/store/store.types';
import * as actionTypes from './../actions/action.types';
import { Action } from 'redux';

export function tasksReducer (state: ITask[] = [], action: Action<string>) {
    switch (action.type){
        case actionTypes.ADD_TASK:
            return [...state, (action as actionTypes.AddTaskAction<actionTypes.ADD_TASK>).task];
        case actionTypes.CHANGE_TASK_STATUS:
        const {taskId, isDone} = {...(action as actionTypes.ChangeTaskStatusAction<actionTypes.CHANGE_TASK_STATUS>)};
            return state.map((task: ITask) => {
                if(task.id === taskId) {
                    return Object.assign({}, task, {isDone})
                }
                return task;
            });
        default:
            return state; 
    }
}