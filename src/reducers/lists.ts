import { List } from 'src/store/store.types';
import * as actionTypes from './../actions/action.types';
import { Action } from 'redux';

export function listsReducer (state: List[] = [], action: Action<string>) {
    switch (action.type){
        case actionTypes.ADD_LIST:
            return [...state, (action as actionTypes.AddListAction<actionTypes.ADD_LIST>).list];
        case actionTypes.ADD_TASK:
            return state;
        default:
            return state; 
    }
}