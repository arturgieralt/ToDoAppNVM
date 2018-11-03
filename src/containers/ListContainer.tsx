import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/actionCreators';
import { IReduxState, ITask} from 'src/store/store.types';
import { TaskList } from '../components/TaskList/TaskList';
import { ListProps, IListStateProps, IListDispatchProps } from './ListContainer.types';
import { Task } from '../components/Task/Task';

class ListContainer extends React.Component<ListProps> {
    constructor (props: ListProps) {
        super(props);
    }

    public render() {
        return (
            <TaskList>
                <h2>
                                {this.props.list.title}
                </h2>
                <input type='button' value='Add task' onClick={() => this.props.onTaskAdd(this.props.list.id)} />
                <TaskList.Ordered>
                            {this.props.list.orderedTasks.map(this.renderTask)} 
                </TaskList.Ordered>
            </TaskList>
            
        );
    }   

    private renderTask =  (taskKey: string, index: number) => {
        const { tasks } = this.props;
        const taskToRender = tasks.find((task: ITask) => {
            return task.id === taskKey;
        });

        if (taskToRender) {
            return (
                <div key={taskKey}>
                    <TaskList.Element>
                        <Task onClick={this.props.changeTaskStatus} task={taskToRender} />
                    </TaskList.Element>
                </div>
            )
        }
        return (
            <div key={taskKey}>
                    <p>Something went wrong! No such task in database.</p>
            </div>
        )
    }
}

const mapStateToProps = (state: IReduxState ): IListStateProps => ({
    tasks: state.tasks
});

const mapDispatchToProps: IListDispatchProps = {
    addTask: actions.addTask,
    changeTaskStatus: actions.changeTaskStatus,
    changeTaskOrder: actions.changeTaskOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)