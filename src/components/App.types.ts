import { AddTaskAction, ADD_TASK, AddListAction, ADD_LIST } from "src/actions/action.types";
import { ReduxState, Task, List } from 'src/store/store.types';

export interface IAppActionProps {
    addTask: (task: Task) => AddTaskAction<ADD_TASK>;
    addList: (list: List) => AddListAction<ADD_LIST>;
}

export type IAppProps = ReduxState & IAppActionProps;