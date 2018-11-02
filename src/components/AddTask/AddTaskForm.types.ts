import { Task } from "src/store/store.types";

export interface IAddTaskFormProps {
    addTask: () => void;
    listId: string;
}

export interface IAddTaskFormState {
    task: Task;
    isValid: boolean;
}
