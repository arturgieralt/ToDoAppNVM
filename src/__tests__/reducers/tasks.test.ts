import { tasksReducer } from "./../../reducers/tasks";
import { ITask } from './../../store/store.types';
import { addTask, changeTaskStatus } from './../../actions/actionCreators';
import * as moment from 'moment';

describe('tasks reducer', () => {
    it('should return the initial state', () => {
        expect(tasksReducer(undefined, {type: ''})).toEqual(initialState);
    }); 

    it('should add task', () => {
        expect(tasksReducer(tasks, addTask(newTask))).toEqual([...tasks, {...newTask} ]);
    }); 

    it('should change task status', () => {
        expect(tasksReducer(tasks, changeTaskStatus('412940a1-f316-473b-a8bf-ce57628f3fae', true))).toEqual([{...taskDone} ]);
    }); 
  });

// MOCKS:

  const initialState: ITask[] = [];

  const currentDate = moment('2018-11-04T15:00:00.000Z');
  const momentDateAfterDeadline = moment('2018-10-28T23:00:00.000Z');

  const tasks: ITask[] = [
    {
      title: 'My task with old date',
      listId: '828df5ec-5497-456f-a8ad-2ac913cfad77',
      isDone: false,
      expiryDate: momentDateAfterDeadline,
      id: '412940a1-f316-473b-a8bf-ce57628f3fae'
    }
  ];

  const newTask: ITask =  {
    title: 'My second task with date just before the deadline',
    listId: '828df5ec-5497-456f-a8ad-2ac913cfad77',
    isDone: false,
    expiryDate: currentDate ,
    id: 'd16d1829-978a-47d1-a2bf-13229c3b73d4'
  }

  const taskDone: ITask =  {
    title: 'My task with old date',
    listId: '828df5ec-5497-456f-a8ad-2ac913cfad77',
    isDone: true,
    expiryDate: momentDateAfterDeadline,
    id: '412940a1-f316-473b-a8bf-ce57628f3fae'
  }