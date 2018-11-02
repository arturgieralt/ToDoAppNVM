import { Task } from 'src/store/store.types';
import * as actionTypes from './../actions/action.types';
import { Action } from 'redux';

export function tasksReducer (state: Task[] = [], action: Action<string>) {
    switch (action.type){
        case actionTypes.ADD_TASK:
            return [...state, (action as actionTypes.AddTaskAction<actionTypes.ADD_TASK>).task];
        default:
            return state; 
    }
}