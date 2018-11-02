import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/actionCreators';
import { ReduxState} from 'src/store/store.types';
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
                            {this.props.list.orderedTasks.map((taskKey: string, index: number) =>(
                                <div key={taskKey}>
                                <TaskList.Element>
                                    <Task onClick={() => console.log()} task={this.props.tasks[0]} />
                                </TaskList.Element>
                                </div>
                                
                            ))} 
                </TaskList.Ordered>
            </TaskList>
            
        )
    }   
}

const mapStateToProps = (state: ReduxState ): IListStateProps => ({
    tasks: state.tasks
});

const mapDispatchToProps: IListDispatchProps = {
    addTask: actions.addTask,
    changeTaskOrder: actions.changeTaskOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)