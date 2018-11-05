import * as React from 'react';
import { ITask } from 'src/store/store.types';
import { IListAllProps, IListState } from './TaskList.types';
import { Task } from '../Task/Task';
import './TaskList.css';
export class TaskList extends React.Component<IListAllProps, IListState> {
  public initState: IListState = {
    isInDragMode: false,
    draggedElementId: null,
    oldPosition: null,
    newPosition: null
  };

  constructor(props: IListAllProps) {
    super(props);

    this.state = {
      ...this.initState
    };
  }

  public onDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    this.setState({
      newPosition: Number(event.currentTarget.getAttribute('data-index'))
    });
  };

  public onDragStart = (
    event: React.DragEvent<HTMLElement>,
    taskId: string,
    index: number
  ) => {
    this.setState({
      isInDragMode: true,
      oldPosition: index,
      draggedElementId: taskId
    });
  };

  public onDragEnd = (event: React.DragEvent<HTMLElement>) => {
    const { oldPosition, newPosition, draggedElementId } = this.state;
    event.preventDefault();
    if (
      oldPosition !== newPosition &&
      draggedElementId !== null &&
      oldPosition !== null &&
      newPosition !== null
    ) {
      this.props.changeTaskOrder(
        this.props.list.id,
        draggedElementId,
        oldPosition,
        newPosition
      );
    }
    this.setState({
      ...this.initState
    });
  };

  public onDragBounded = (taskKey: string, index: number) => (
    e: React.DragEvent<HTMLElement>
  ) => this.onDragStart(e, taskKey, index);
  public onAddClick = () => this.props.onTaskAdd(this.props.list.id);

  public renderTask = (taskKey: string, index: number) => {
    const { tasks } = this.props;
    const taskToRender = tasks.find((task: ITask) => {
      return task.id === taskKey;
    });

    if (taskToRender) {
      return (
        <li
          key={taskKey}
          data-index={index}
          draggable={true}
          onDragStart={this.onDragBounded(taskKey, index)}
          onDragEnd={this.onDragEnd}
          onDragOver={this.onDragOver}
        >
          <Task onClick={this.props.changeTaskStatus} task={taskToRender} />
        </li>
      );
    }
    return (
      <li key={taskKey} data-index={index}>
        <p>Something went wrong! No such task in database.</p>
      </li>
    );
  };

  public render() {
    return (
      <div className="taskListContainer">
        <div className="taskListHeader">
          <h2>{this.props.list.title}</h2>
          <span onClick={this.onAddClick}>&#43;</span>
        </div>
        {this.props.list.orderedTasks.length > 0 ? (
          <ol>{this.props.list.orderedTasks.map(this.renderTask)}</ol>
        ) : (
          <p>Your list is empty. Add new task by clicking on + button above.</p>
        )}
      </div>
    );
  }
}
