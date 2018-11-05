import { ITask, IList } from 'src/store/store.types';
import * as actionTypes from '../../actions/action.types';

export interface IListStateProps {
  tasks: ITask[];
}

export interface IListProps {
  list: IList;
  onTaskAdd: (listId: string) => void;
}

export interface IListDispatchProps {
  changeTaskStatus: (
    taskId: string,
    isDone: boolean
  ) => actionTypes.ChangeTaskStatusAction<actionTypes.CHANGE_TASK_STATUS>;
  changeTaskOrder: (
    listId: string,
    taskId: string,
    oldPosition: number,
    newPosition: number
  ) => actionTypes.ChangeTaskOrderAction<actionTypes.CHANGE_TASK_ORDER>;
}

export interface IListState {
  isInDragMode: boolean;
  draggedElementId: string | null;
  oldPosition: number | null;
  newPosition: number | null;
}

export type IListAllProps = IListProps & IListStateProps & IListDispatchProps;
