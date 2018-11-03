import { IList } from 'src/store/store.types';
import * as actionTypes from './../actions/action.types';
import { Action } from 'redux';

export function listsReducer (state: IList[] = [], action: Action<string>) {
    switch (action.type){
        case actionTypes.ADD_LIST:
            return [...state, (action as actionTypes.AddListAction<actionTypes.ADD_LIST>).list];
        case actionTypes.ADD_TASK:
            const task = {...(action as actionTypes.AddTaskAction<actionTypes.ADD_TASK>).task};
            return state.map((list: IList) => {
                if(task.listId === list.id) {
                    const updatedTasks = [...list.orderedTasks, task.id];
                    return Object.assign({}, list, {orderedTasks: updatedTasks})
                }
                return list;
            });
        default:
            return state; 
    }
}