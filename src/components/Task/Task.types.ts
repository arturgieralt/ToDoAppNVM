import { ITask } from 'src/store/store.types';
import { ChangeTaskStatusAction, CHANGE_TASK_STATUS } from 'src/actions/action.types';

export interface ITaskProps {
    task: ITask;
    onClick: (taskId: string, isDone: boolean) => ChangeTaskStatusAction<CHANGE_TASK_STATUS>;
}