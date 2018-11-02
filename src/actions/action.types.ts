import { Action } from 'redux';
import { Task, List } from 'src/store/store.types';

export const ADD_TASK = '[TASK]_ADD';
export type ADD_TASK = typeof ADD_TASK;

export const SORT_TASKS = '[TASKS]_SORT';
export type SORT_TASKS = typeof SORT_TASKS;

export const CHANGE_TASK_ORDER = '[TASK]_CHANGE_ORDER';
export type CHANGE_TASK_ORDER = typeof CHANGE_TASK_ORDER;

export const ADD_LIST = '[LIST]_ADD';
export type ADD_LIST = typeof ADD_LIST;

export interface AddTaskAction<T> extends Action {
    type: T;
    task: Task
}

export interface SortTasksAction<T> extends Action {
    type: T;
    listId: string
}

export interface ChangeTaskOrderAction<T> extends Action {
    type: T;
    listId: string,
    oldPosition: number,
    newPosition: number
}

export interface AddListAction<T> extends Action {
    type: T;
    list: List
}
