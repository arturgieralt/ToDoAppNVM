import { ITask } from 'src/store/store.types';
import { AddTaskAction, ADD_TASK } from 'src/actions/action.types';

export interface IAddTaskFormProps {
  addTask: (task: ITask) => AddTaskAction<ADD_TASK>;
  listId: string;
}

export interface IAddTaskFormState {
  task: ITask;
  isValid: boolean;
}
