import { IList, ITask } from 'src/store/store.types';
import * as actionTypes from './../actions/action.types';
import { Action } from 'redux';
import { Moment } from 'moment';

const addTaskToList = (task: ITask) => (list: IList) => {
    if(task.listId === list.id) {
        const updatedTasks = [...list.orderedTasks, task.id];
        return Object.assign({}, list, {orderedTasks: updatedTasks})
    }
    return list;
}

const changeTaskOrder = (listId: string, newPosition: number, oldPosition: number, taskId: string) => 
                        (list: IList) => {
    if(listId === list.id) {
        const updatedTasks = [...list.orderedTasks];
        if (updatedTasks[oldPosition] === taskId) {
            updatedTasks.splice(newPosition, 0, updatedTasks.splice(oldPosition, 1)[0])
        }
        return Object.assign({}, list, {orderedTasks: updatedTasks})
    }
    return list;
}

const sortTasks = (allTasks: ITask[], currentDate: Moment) => (list: IList) => {
    const tasksToOrder = [...list.orderedTasks];
    const [outdated, uptodate] = tasksToOrder.reduce(makeArrayPartition(allTasks, currentDate), [[], []]);
    const orderedList = [...outdated, ...uptodate];
    return Object.assign({}, list, {
        orderedTasks: orderedList
    });
}

const makeArrayPartition = (allTasks: ITask[], currentDate: Moment) => ([old, fresh]: string[][], id: string, index: number) => {
    const currentTask = allTasks.find((t: ITask) => {
        return t.id === id;
    })
    if (currentTask) {
        if (currentTask.expiryDate && !currentTask.isDone) {
            return (currentTask.expiryDate.diff(currentDate, "ms") < 0)  ?
             [[...old, id], fresh] : 
             [old, [...fresh, id]];
        }
    }
    return [old, [...fresh, id] ];
}

export function listsReducer (state: IList[] = [], action: Action<string>) {
    switch (action.type){
        case actionTypes.ADD_LIST:
            return [...state, (action as actionTypes.AddListAction<actionTypes.ADD_LIST>).list];
        case actionTypes.ADD_TASK:
            const task = {...(action as actionTypes.AddTaskAction<actionTypes.ADD_TASK>).task};
            return state.map(addTaskToList(task));
        case actionTypes.CHANGE_TASK_ORDER:
            const {listId, newPosition, oldPosition, taskId} = (action as actionTypes.ChangeTaskOrderAction<actionTypes.CHANGE_TASK_ORDER>);
            return state.map(changeTaskOrder(listId, newPosition, oldPosition, taskId));
        case actionTypes.SORT_TASKS:
            const allTasks = [...(action as actionTypes.SortTasksAction<actionTypes.SORT_TASKS>).tasks];
            const { currentDate } = (action as actionTypes.SortTasksAction<actionTypes.SORT_TASKS>);
            return state.map(sortTasks(allTasks, currentDate));
        default:
            return state; 
    }
}