export interface IReduxState {
    lists: IList[];
    tasks: ITask[];
}

export interface IList {
    id: string;
    title: string;
    orderedTasks: string[];
}

export interface ITask {
    id: string;
    title: string;
    isDone: boolean;
    expiryDate: string | undefined;
    listId: string;
}