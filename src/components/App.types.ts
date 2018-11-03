import { AddTaskAction, ADD_TASK, AddListAction, ADD_LIST } from "src/actions/action.types";
import { IReduxState, ITask, IList } from 'src/store/store.types';

export interface IAppActionProps {
    addTask: (task: ITask) => AddTaskAction<ADD_TASK>;
    addList: (list: IList) => AddListAction<ADD_LIST>;
}

export type IAppProps = IReduxState & IAppActionProps;