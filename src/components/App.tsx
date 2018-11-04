import * as React from 'react';
import './App.css';
import { AddListForm } from './AddListForm/AddListForm';
import { IAppProps, IAppState } from './App.types';
import ListContainer from 'src/containers/ListContainer';
import { IList } from 'src/store/store.types';
import { AddTaskForm } from './AddTask/AddTaskForm';
import { Modal } from './Modal/Modal';
import * as moment from 'moment';

class App extends React.Component <IAppProps, IAppState >{

  private initState: IAppState = {
    activeListId: null
  }

  constructor(props: IAppProps) {
    super(props);
    this.state = {...this.initState}
  }

  public componentDidMount () {
    setInterval(() => this.props.sortTasks(this.props.tasks, moment()), 5000);
  }

  public render() {
    return (
      <div className="App">
        <AddListForm onAdd={this.props.addList}/>
        <Modal isOpened={this.state.activeListId ? true : false} onClose={() => this.setActiveListId(null)} header='Add task'>
          {this.state.activeListId && <AddTaskForm listId={this.state.activeListId} addTask={this.props.addTask} />}
        </Modal>
        {this.props.lists.map((list: IList, index: number) => (
          <ListContainer onTaskAdd={this.setActiveListId} key={list.id} list={list}/>
        ))}
      </div>
    );
  }

  private setActiveListId = (listId: string | null) => {
    this.setState ({
      activeListId: listId
    })
  }



}

export default App;
