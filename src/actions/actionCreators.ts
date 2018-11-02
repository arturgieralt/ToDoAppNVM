import * as actionTypes from './action.types';
import { Task, List } from 'src/store/store.types';



export function addTask(task: Task):
    actionTypes.AddTaskAction<actionTypes.ADD_TASK> {
    return {
        type: actionTypes.ADD_TASK,
        task
    }
}

export function addList(list: List):
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


