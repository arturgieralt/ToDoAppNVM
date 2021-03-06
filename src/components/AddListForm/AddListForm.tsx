import * as React from 'react';
import * as uuid from 'uuid';
import './AddListForm.css';
import { IAddListProps, IAddListFormState } from './AddListForm.types';

export class AddListForm extends React.Component<
  IAddListProps,
  IAddListFormState
> {
  public initState: IAddListFormState = {
    list: {
      title: '',
      id: '',
      orderedTasks: []
    },
    isValid: false
  };

  constructor(props: IAddListProps) {
    super(props);
    this.state = { ...this.initState };
    this.onInputChange = this.onInputChange.bind(this);
    this.addList = this.addList.bind(this);
  }

  public onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const list = Object.assign({}, this.state.list, {
      title: value
    });
    this.setState({
      list,
      isValid: value.length > 0 ? true : false
    });
  };

  public guidProvider(): string {
    return uuid.v4();
  }

  public addList (event: React.MouseEvent<HTMLInputElement>) {
    if (this.state.isValid) {
      const listWithId = Object.assign({}, this.state.list, {
        id: this.guidProvider()
      });
      this.props.onAdd(listWithId);
      this.setState({
        ...this.initState
      });
    }
  };

  public render() {
    return (
      <div className="addListContainer">
        <input
          type="text"
          onChange={this.onInputChange}
          name="title"
          placeholder="Your list title"
          value={this.state.list.title}
        />
        <input
          type="button"
          value="Add"
          onClick={this.addList}
          disabled={!this.state.isValid}
        />
      </div>
    );
  }
}
