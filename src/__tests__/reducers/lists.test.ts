import { listsReducer } from './../../reducers/lists';
import { IList, ITask } from './../../store/store.types';
import { addList, changeTaskOrder, sortTasks, addTask } from './../../actions/actionCreators';
import * as moment from 'moment';

describe('lists reducer', () => {
    it('should return the initial state', () => {
        expect(listsReducer(undefined, {type: ''})).toEqual(initialState);
    });

    it('should add list', () => {
        expect(listsReducer(initialState, addList(list))).toEqual([{...list}]);
    });

    it('should add task to the list', () => {
        expect(listsReducer([{...list}], addTask(taskToAdd))).toEqual([{...listWithTaskAdded}]);
    });

    it('should change task order', () => {
        expect(listsReducer([{...listBeforeChangingTaskOrder}], changeTaskOrder('828df5ec-5497-456f-a8ad-2ac913cfad77', '4ada1fb9-789d-460f-8be1-f01f14eb522d', 3, 0 ))).toEqual([{...listAfterChangingTaskOrder}]);
    });

    it('should not change task order when position or guid is wrong', () => {
        expect(listsReducer([{...listBeforeChangingTaskOrder}], changeTaskOrder('828df5ec-5497-456f-a8ad-2ac913cfad77', '4ada1fb9-789d-460f-8be1-f01f14eb522d', 4, 0 ))).toEqual([{...listBeforeChangingTaskOrder}]);
        expect(listsReducer([{...listBeforeChangingTaskOrder}], changeTaskOrder('828df5ec-5497-456f-a8ad-2ac913cfad77', '4ada1fb9-789d-460f-8be1-f01f14eb522d', 2, 0 ))).toEqual([{...listBeforeChangingTaskOrder}]);
        expect(listsReducer([{...listBeforeChangingTaskOrder}], changeTaskOrder('828df5ec-5497-456f-a8ad-2ac913cfad77', 'wrongGuid-789d-460f-8be1-f01f14eb522d', 3, 0 ))).toEqual([{...listBeforeChangingTaskOrder}]);
    });

    it('should sort tasks', () => {
        expect(listsReducer([{...listBeforeSorting}], sortTasks(tasks, currentDate))).toEqual([{...listAfterSorting}]);
    });

    it('should not sort tasks when they are done', () => {
        expect(listsReducer([{...listBeforeSorting}], sortTasks(tasksDone, currentDate))).toEqual([{...listBeforeSorting}]);
    });
    
  });

// MOCKS:

const initialState: IList[] = [];
const list: IList =  {
    title: 'My Test List',
    id: '828df5ec-5497-456f-a8ad-2ac913cfad77',
    orderedTasks: [ ]
  };
const listWithTaskAdded: IList =  {
    title: 'My Test List',
    id: '828df5ec-5497-456f-a8ad-2ac913cfad77',
    orderedTasks: [ '412940a1-f316-473b-a8bf-ce57628f3fae' ]
};

const listBeforeChangingTaskOrder: IList = {
    title: 'My Test List',
    id: '828df5ec-5497-456f-a8ad-2ac913cfad77',
    orderedTasks: ['412940a1-f316-473b-a8bf-ce57628f3fae',
    'd16d1829-978a-47d1-a2bf-13229c3b73d4',
    'dcd5ee4c-672b-445f-9362-2724da996448',
    '4ada1fb9-789d-460f-8be1-f01f14eb522d']
};
const listAfterChangingTaskOrder: IList = {
    title: 'My Test List',
    id: '828df5ec-5497-456f-a8ad-2ac913cfad77',
    orderedTasks: ['4ada1fb9-789d-460f-8be1-f01f14eb522d',
    '412940a1-f316-473b-a8bf-ce57628f3fae',
    'd16d1829-978a-47d1-a2bf-13229c3b73d4',
    'dcd5ee4c-672b-445f-9362-2724da996448'
    ]
};
const listBeforeSorting: IList = {
    title: 'My Test List',
    id: '828df5ec-5497-456f-a8ad-2ac913cfad77',
    orderedTasks: ['4ada1fb9-789d-460f-8be1-f01f14eb522d',
    'dcd5ee4c-672b-445f-9362-2724da996448',
    'd16d1829-978a-47d1-a2bf-13229c3b73d4',
    '412940a1-f316-473b-a8bf-ce57628f3fae'
    ]
};
const listAfterSorting: IList = {
    title: 'My Test List',
    id: '828df5ec-5497-456f-a8ad-2ac913cfad77',
    orderedTasks: [
    '412940a1-f316-473b-a8bf-ce57628f3fae',
    '4ada1fb9-789d-460f-8be1-f01f14eb522d',
    'dcd5ee4c-672b-445f-9362-2724da996448',
    'd16d1829-978a-47d1-a2bf-13229c3b73d4',
    ]
};
const currentDate = moment('2018-11-04T15:00:00.000Z');
const momentDateAfterDeadline = moment('2018-10-28T23:00:00.000Z');
const momentDateJustBeforeDeadline = moment('2018-11-05T22:00:00.000Z');
const momentDateFresh = moment('2018-11-28T23:00:00.000Z');
const taskToAdd: ITask = {
    title: 'My task with old date',
    listId: '828df5ec-5497-456f-a8ad-2ac913cfad77',
    isDone: false,
    expiryDate: momentDateAfterDeadline,
    id: '412940a1-f316-473b-a8bf-ce57628f3fae'
}
const tasks: ITask[] = [
    {
      title: 'My task with old date',
      listId: '828df5ec-5497-456f-a8ad-2ac913cfad77',
      isDone: false,
      expiryDate: momentDateAfterDeadline,
      id: '412940a1-f316-473b-a8bf-ce57628f3fae'
    },
    {
      title: 'My second task with date just before the deadline',
      listId: '828df5ec-5497-456f-a8ad-2ac913cfad77',
      isDone: false,
      expiryDate: momentDateJustBeforeDeadline ,
      id: 'd16d1829-978a-47d1-a2bf-13229c3b73d4'
    },
    {
      title: 'Task without date',
      listId: '828df5ec-5497-456f-a8ad-2ac913cfad77',
      isDone: false,
      expiryDate: undefined,
      id: 'dcd5ee4c-672b-445f-9362-2724da996448'
    },
    {
      title: 'Task with normal date',
      listId: '828df5ec-5497-456f-a8ad-2ac913cfad77',
      isDone: false,
      expiryDate: momentDateFresh,
      id: '4ada1fb9-789d-460f-8be1-f01f14eb522d'
    }
  ];

  const tasksDone: ITask[] = [
    {
      title: 'My task with old date',
      listId: '828df5ec-5497-456f-a8ad-2ac913cfad77',
      isDone: true,
      expiryDate: momentDateAfterDeadline,
      id: '412940a1-f316-473b-a8bf-ce57628f3fae'
    },
    {
      title: 'My second task with date just before the deadline',
      listId: '828df5ec-5497-456f-a8ad-2ac913cfad77',
      isDone: true,
      expiryDate: momentDateJustBeforeDeadline ,
      id: 'd16d1829-978a-47d1-a2bf-13229c3b73d4'
    },
    {
      title: 'Task without date',
      listId: '828df5ec-5497-456f-a8ad-2ac913cfad77',
      isDone: true,
      expiryDate: undefined,
      id: 'dcd5ee4c-672b-445f-9362-2724da996448'
    },
    {
      title: 'Task with normal date',
      listId: '828df5ec-5497-456f-a8ad-2ac913cfad77',
      isDone: true,
      expiryDate: momentDateFresh,
      id: '4ada1fb9-789d-460f-8be1-f01f14eb522d'
    }
  ];