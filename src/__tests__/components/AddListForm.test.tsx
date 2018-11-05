
import * as React from 'react'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { AddListForm } from './../../components/AddListForm/AddListForm';
import { IAddListFormState, IAddListProps } from './../../components/AddListForm/AddListForm.types';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props: IAddListProps = {
      onAdd: jest.fn()
    }
  ​
    const enzymeWrapper = Enzyme.shallow(<AddListForm {...props} />)
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
        expect(titleInput.props().placeholder).toBe('Your list title');
        expect(addButton.props().value).toBe('Add');
 
    });

    it('it calls add list redux action when the state is valid and reset it', () => {
        const { enzymeWrapper, props } = setup();
        const addButton = enzymeWrapper.find('input[type="button"]');
        const titleInput = enzymeWrapper.find('input[type="text"]');
        expect((enzymeWrapper.state() as IAddListFormState).isValid).toBe(false);
        addButton.simulate('click');
        expect((props.onAdd as jest.Mock<{}>).mock.calls.length).toBe(0);
        titleInput.simulate('change', {target: {name: "title", value: 'My new list title'}});
        expect((enzymeWrapper.state() as IAddListFormState).isValid).toBe(true);
        expect((enzymeWrapper.state() as IAddListFormState).list.title).toBe('My new list title');
        addButton.simulate('click');
        expect((enzymeWrapper.state() as IAddListFormState).isValid).toBe(false);
        expect((props.onAdd as jest.Mock<{}>).mock.calls.length).toBe(1);
    });

});
