import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/actionCreators';
import { ReduxState} from 'src/store/store.types';
import { TaskList } from '../TaskList/TaskList';
import { ListProps, IListStateProps, IListDispatchProps } from './ListContainer.types';
import { Task } from '../Task/Task';

class ListContainer extends React.Component<ListProps> {
    constructor (props: ListProps) {
        super(props);
    }

    public render() {
        return (
            <TaskList>
                <TaskList.Ordered>
                            {this.props.list.orderedTasks.map((taskKey: string, index: number) =>(
                                <TaskList.Element>
                                    <Task onClick={() => console.log()} task={this.props.tasks[0]} />
                                </TaskList.Element>
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