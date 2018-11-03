import * as actionTypes from './action.types';
import { ITask, IList } from 'src/store/store.types';



export function addTask(task: ITask):
    actionTypes.AddTaskAction<actionTypes.ADD_TASK> {
    return {
        type: actionTypes.ADD_TASK,
        task
    }
}

export function addList(list: IList):
    actionTypes.AddListAction<actionTypes.ADD_LIST> {
    return {
        type: actionTypes.ADD_LIST,
        list
    }
}

export function changeTaskOrder(listId: string, oldPosition: number, newPosition: number):
    actionTypes.ChangeTaskOrderAction<actionTypes.CHANGE_TASK_ORDER> {
    return {
        type: actionTypes.CHANGE_TASK_ORDER,
        listId,
        oldPosition,
        newPosition
    }
}

export function sortTasks(listId: string):
    actionTypes.SortTasksAction<actionTypes.SORT_TASKS> {
    return {
        type: actionTypes.SORT_TASKS,
        listId
    }
}

export function changeTaskStatus(taskId: string, isDone: boolean):
    actionTypes.ChangeTaskStatusAction<actionTypes.CHANGE_TASK_STATUS> {
    return {
        type: actionTypes.CHANGE_TASK_STATUS,
        taskId,
        isDone
    }
}


