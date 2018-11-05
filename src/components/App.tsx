import * as React from 'react';
import './App.css';
import { AddListForm } from './AddListForm/AddListForm';
import { IAppProps, IAppState } from './App.types';
import ListContainer from 'src/containers/ListContainer';
import { IList } from 'src/store/store.types';
import { AddTaskForm } from './AddTask/AddTaskForm';
import { Modal } from './Modal/Modal';
import * as moment from 'moment';

class App extends React.Component<IAppProps, IAppState> {
  public initState: IAppState = {
    activeListId: null
  };

  constructor(props: IAppProps) {
    super(props);
    this.state = { ...this.initState };
    this.scheduleAction = this.scheduleAction.bind(this);
    this.setActiveListId = this.setActiveListId.bind(this);
    this.setActiveListToNull = this.setActiveListToNull.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  public componentDidMount() {
    const interval = 5000;
    this.scheduleAction(interval);
  }

  public scheduleAction (interval: number) {
    return setInterval(
      () => this.props.sortTasks(this.props.tasks, moment()),
      interval
    ); // did not destruct to keep the ref
  }

  public setActiveListId (listId: string | null)  {
    this.setState({
      activeListId: listId
    });
  };

  public setActiveListToNull () {
    return this.setActiveListId(null);
  }

  public renderList (list: IList, index: number) {
    return (
      <ListContainer
        onTaskAdd={this.setActiveListId}
        key={list.id}
        list={list}
      />
    );
  };

  public render() {
    const { addList, addTask } = this.props;
    const { activeListId } = this.state;
    const isModalOpened = activeListId ? true : false;
    return (
      <div className="App">
        <AddListForm onAdd={addList} />
        <Modal
          isOpened={isModalOpened}
          onClose={this.setActiveListToNull}
          header="Add task"
        >
          {activeListId && (
            <AddTaskForm listId={activeListId} addTask={addTask} />
          )}
        </Modal>
        {this.props.lists.map(this.renderList)}
      </div>
    );
  }
}

export default App;
