import { Task, List } from "src/store/store.types";
import * as actionTypes from './../actions/action.types';

export interface IListStateProps {
    tasks: Task[];
}

export interface IListProps {
    list: List;
    onTaskAdd: (listId: string) => void;
}

export interface IListDispatchProps {
    addTask: (task: Task) => actionTypes.AddTaskAction<actionTypes.ADD_TASK>;
    changeTaskOrder: (listId: string, oldPosition: number, newPosition: number) => actionTypes.ChangeTaskOrderAction<actionTypes.CHANGE_TASK_ORDER>
}

export type ListProps = IListProps & IListStateProps & IListDispatchProps;