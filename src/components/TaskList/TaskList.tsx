import * as React from 'react';
import { ITask} from 'src/store/store.types';
import { ListProps } from './TaskList.types';
import { Task } from '../Task/Task';
import './TaskList.css';
export class TaskList extends React.Component<ListProps, any> {
    
    private initState = {
        isInDragMode: false,
        draggedElementId: null,
        oldPostion: null,
        newPosition: null
    }

    constructor (props: ListProps) {
        super(props);

        this.state = {
            ...this.initState
        }
    }

    public render() {
        return (
            <div className="taskListContainer">
                <div className="taskListHeader">
                    <h2>
                        {this.props.list.title}
                    </h2>
                    <span onClick={() => this.props.onTaskAdd(this.props.list.id)}>&#43;</span>
                </div>
                <ol>
                    {this.props.list.orderedTasks.map(this.renderTask)} 
                </ol>
            </div>
            
        );
    }   

    private onDragOver = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        this.setState({
            newPosition: Number(event.currentTarget.getAttribute('data-index'))
        });
    }


    private onDragStart = (event: React.DragEvent<HTMLElement>,  taskId: string, index:  number) => {
        this.setState({
            isInDragMode: true,
            oldPosition: index,
            draggedElementId: taskId
        });
        
    }

    private onDragEnd = (event: React.DragEvent<HTMLElement>) => {
        const {oldPosition, newPosition, draggedElementId} = this.state
        event.preventDefault();
        if (oldPosition !== newPosition){
            this.props.changeTaskOrder(this.props.list.id, draggedElementId, oldPosition, newPosition);
        }
        this.setState({
            ...this.initState
        });
    }

    private renderTask =  (taskKey: string, index: number) => {
        const { tasks } = this.props;
        const taskToRender = tasks.find((task: ITask) => {
            return task.id === taskKey;
        });

        if (taskToRender) {
            return (
                    <li key={taskKey}
                        data-index={index}
                        draggable={true}
                        onDragStart={(e) => this.onDragStart(e, taskKey, index)}
                        onDragEnd={this.onDragEnd}
                        onDragOver={this.onDragOver}
                        >
                        <Task onClick={this.props.changeTaskStatus} task={taskToRender} />
                    </li>
            );
        }
        return (
            <li key={taskKey}
                data-index={index}>
                    <p>Something went wrong! No such task in database.</p>
            </li>
        )
    }
}