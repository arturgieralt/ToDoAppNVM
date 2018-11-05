
import * as React from 'react'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { TaskList } from './../../components/TaskList/TaskList';
import { IListAllProps } from './../../components/TaskList/TaskList.types';
import * as moment from 'moment';
import { IList, ITask } from './../../store/store.types';
Enzyme.configure({ adapter: new Adapter() });

const list: IList = {
    title: 'My Test List',
    id: '828df5ec-5497-456f-a8ad-2ac913cfad77',
    orderedTasks: [
    '412940a1-f316-473b-a8bf-ce57628f3fae',
    '4ada1fb9-789d-460f-8be1-f01f14eb522d',
    'dcd5ee4c-672b-445f-9362-2724da996448',
    'd16d1829-978a-47d1-a2bf-13229c3b73d4',
    ]
};

const momentDateAfterDeadline = moment('2018-10-28T23:00:00.000Z');
const momentDateJustBeforeDeadline = moment('2018-11-05T22:00:00.000Z');
const momentDateFresh = moment('2018-11-28T23:00:00.000Z');

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

function setup() {
    const props: IListAllProps = {
        list,
        changeTaskStatus: jest.fn(),
        changeTaskOrder: jest.fn(),
        onTaskAdd: jest.fn(),
        tasks
    }​
    const enzymeWrapper = Enzyme.shallow(<TaskList {...props} />)
  ​
    return {
      props,
      enzymeWrapper
    }
  }

describe('TaskList component', () => {
    it('should render itself and show correct data', () => {
        const { enzymeWrapper } = setup();
        const listElements = enzymeWrapper.find('li');
        expect(listElements.length).toBe(4);
    });

    it('triggers onAdd fn when clicking on span', () => {
        const { enzymeWrapper, props } = setup();
        enzymeWrapper.find('span').simulate('click');
        expect((props.onTaskAdd as jest.Mock<{}>).mock.calls.length).toBe(1);
    });
});

