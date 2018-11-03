import { ITask, IList } from "src/store/store.types";
import * as actionTypes from './../actions/action.types';

export interface IListStateProps {
    tasks: ITask[];
}

export interface IListProps {
    list: IList;
    onTaskAdd: (listId: string) => void;
}

export interface IListDispatchProps {
    addTask: (task: ITask) => actionTypes.AddTaskAction<actionTypes.ADD_TASK>;
    changeTaskStatus: (taskId: string, isDone: boolean) => actionTypes.ChangeTaskStatusAction<actionTypes.CHANGE_TASK_STATUS>;
    changeTaskOrder: (listId: string, oldPosition: number, newPosition: number) => actionTypes.ChangeTaskOrderAction<actionTypes.CHANGE_TASK_ORDER>
}

export type ListProps = IListProps & IListStateProps & IListDispatchProps;