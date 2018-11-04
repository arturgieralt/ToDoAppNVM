import { AddTaskAction, ADD_TASK, AddListAction, ADD_LIST, SortTasksAction, SORT_TASKS } from "src/actions/action.types";
import { IReduxState, ITask, IList } from 'src/store/store.types';
import { Moment } from 'moment';

export interface IAppActionProps {
    addTask: (task: ITask) => AddTaskAction<ADD_TASK>;
    addList: (list: IList) => AddListAction<ADD_LIST>;
    sortTasks: (tasks: ITask[], currentDate: Moment) => SortTasksAction<SORT_TASKS>;
}

export interface IAppState {
    activeListId: string | null;
  }
  
export type IAppProps = IReduxState & IAppActionProps;