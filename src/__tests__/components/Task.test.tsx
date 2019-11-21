
import * as React from 'react'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
​import { Task, shouldTaskBeHighlighted } from './../../components/Task/Task';
import * as moment from 'moment';
import { ITask } from './../../store/store.types';

Enzyme.configure({ adapter: new Adapter() });
const currentDate = moment('2018-11-04T15:00:00.000Z');
const oldDate = moment('2017-11-04T15:00:00.000Z');
const justBeforeDeadline = moment('2018-11-05T11:00:00.000Z');
const freshDate = moment('2019-11-05T11:00:00.000Z');

const task: ITask =  {
    title: 'My second task with date just before the deadline',
    listId: '828df5ec-5497-456f-a8ad-2ac913cfad77',
    isDone: false,
    expiryDate: currentDate ,
    id: 'd16d1829-978a-47d1-a2bf-13229c3b73d4'
  }

const taskWithNoDate: ITask =  {
    title: 'My done task with no date',
    listId: '828df5ec-5497-456f-a8ad-2ac913cfad77',
    isDone: true,
    expiryDate: undefined ,
    id: 'd16d1829-978a-47d1-a2bf-13229c3b73d4'
  }

function setup(propsTask: ITask) {
    const props = {
      onClick: jest.fn(),
      task: propsTask
    }
  ​
    const enzymeWrapper = Enzyme.shallow(<Task {...props} />)
  ​
    return {
      props,
      enzymeWrapper
    }
  }


describe('Task component', () => {
    it('should render itself and show correct data', () => {
        const { enzymeWrapper } = setup(task);
        const checkboxInputProps = enzymeWrapper.find('input').props();
        expect(enzymeWrapper.find('h2').text()).toBe('My second task with date just before the deadline');
        expect(enzymeWrapper.find('span').text()).toBe('2018-11-04 04:00');
        expect(checkboxInputProps.checked).toBe(false);
    });

    it('should render itself and show correct data', () => {
        const { enzymeWrapper } = setup(taskWithNoDate);
        const checkboxInputProps = enzymeWrapper.find('input').props();
        expect(enzymeWrapper.find('h2').text()).toBe('My done task with no date');
        expect(enzymeWrapper.find('span').text()).toBe('No expiration date.');
        expect(checkboxInputProps.checked).toBe(true);
    });

    it('clicking on checbox calls redux action', () => {
        const { enzymeWrapper, props } = setup(task);
        const input = enzymeWrapper.find('input');
        input.simulate('change');
        expect(props.onClick.mock.calls.length).toBe(1);
    });

    it('highlights tasks correctly', () => {
        expect(shouldTaskBeHighlighted(undefined, currentDate, true)).toBe(false);
        expect(shouldTaskBeHighlighted(oldDate, currentDate, false)).toBe(false);
        expect(shouldTaskBeHighlighted(justBeforeDeadline, currentDate, false)).toBe(true);
        expect(shouldTaskBeHighlighted(justBeforeDeadline, currentDate, true)).toBe(false);
        expect(shouldTaskBeHighlighted(freshDate, currentDate, false)).toBe(false);
    });
});
