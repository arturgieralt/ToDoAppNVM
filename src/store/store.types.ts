export interface ReduxState {
    lists: List[];
    tasks: Task[];
}

export interface List {
    id: string;
    title: string;
    orderedTasks: string[];
}

export interface Task {
    id: string;
    title: string;
    isDone: boolean;
    expiryDate: string | undefined;
    listId: string;
}