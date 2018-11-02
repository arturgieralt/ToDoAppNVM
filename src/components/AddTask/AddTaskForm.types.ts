import { Task } from "src/store/store.types";
import { AddTaskAction, ADD_TASK } from 'src/actions/action.types';

export interface IAddTaskFormProps {
addTask: (task: Task) => AddTaskAction<ADD_TASK>;
    listId: string;
}

export interface IAddTaskFormState {
    task: Task;
    isValid: boolean;
}
