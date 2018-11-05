
import * as React from 'react'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
​import { AddTaskForm } from './../../components/AddTask/AddTaskForm';
​import { IAddTaskFormProps, IAddTaskFormState } from './../../components/AddTask/AddTaskForm.types';
import * as Datetime from 'react-datetime';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props: IAddTaskFormProps = {
      addTask: jest.fn(),
      listId: '828df5ec-5497-456f-a8ad-2ac913cfad77'
    }
  ​
    const enzymeWrapper = Enzyme.shallow(<AddTaskForm {...props} />)
  ​
    return {
      props,
      enzymeWrapper
    }
  }

describe('Test component', () => {
    it('should render itself and show correct data', () => {
        const { enzymeWrapper } = setup();
        const titleInput = enzymeWrapper.find('input[type="text"]');
        const addButton = enzymeWrapper.find('input[type="button"]');
        const datetimeProps = enzymeWrapper.find(Datetime).props();
        expect(titleInput.props().placeholder).toBe('Your task title');
        expect(addButton.props().value).toBe('Add');
        expect(datetimeProps.inputProps!.placeholder).toBe('Choose date');
    });

    it('it adds task redux action when the state is valid and reset it', () => {
        const { enzymeWrapper, props } = setup();
        const addButton = enzymeWrapper.find('input[type="button"]');
        expect((enzymeWrapper.state() as IAddTaskFormState).isValid).toBe(false);
        addButton.simulate('click');
        expect((props.addTask as jest.Mock<{}>).mock.calls.length).toBe(0);
        enzymeWrapper.setState({isValid: true}, () => {
            addButton.simulate('click');
            expect((enzymeWrapper.state() as IAddTaskFormState).isValid).toBe(false);
            expect((props.addTask as jest.Mock<{}>).mock.calls.length).toBe(1);
        });
    });

});
