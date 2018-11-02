import { Task } from 'src/store/store.types';

export interface ITaskProps {
    task: Task;
    onClick: (key: string) => void;
}