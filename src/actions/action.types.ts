import { Action } from 'redux';
import { ITask, IList } from 'src/store/store.types';
import { Moment } from 'moment';

export const ADD_TASK = '[TASK]_ADD';
export type ADD_TASK = typeof ADD_TASK;

export const SORT_TASKS = '[TASKS]_SORT';
export type SORT_TASKS = typeof SORT_TASKS;

export const CHANGE_TASK_ORDER = '[TASK]_CHANGE_ORDER';
export type CHANGE_TASK_ORDER = typeof CHANGE_TASK_ORDER;

export const ADD_LIST = '[LIST]_ADD';
export type ADD_LIST = typeof ADD_LIST;

export const CHANGE_TASK_STATUS = '[TASK]_CHANGE_STATUS';
export type CHANGE_TASK_STATUS = typeof CHANGE_TASK_STATUS;

export interface AddTaskAction<T> extends Action {
  type: T;
  task: ITask;
}

export interface SortTasksAction<T> extends Action {
  type: T;
  tasks: ITask[];
  currentDate: Moment;
}

export interface ChangeTaskOrderAction<T> extends Action {
  type: T;
  listId: string;
  taskId: string;
  oldPosition: number;
  newPosition: number;
}

export interface AddListAction<T> extends Action {
  type: T;
  list: IList;
}

export interface ChangeTaskStatusAction<T> extends Action {
  type: T;
  taskId: string;
  isDone: boolean;
}
