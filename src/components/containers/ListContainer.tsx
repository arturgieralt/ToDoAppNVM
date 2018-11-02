import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/actionCreators';
import { ReduxState} from 'src/store/store.types';
import { ListComponent } from '../List/List';
import { ListProps, IListStateProps, IListDispatchProps } from './ListContainer.types';
import { Task } from '../Task/Task';

class ListContainer extends React.Component<ListProps> {
    constructor (props: ListProps) {
        super(props);
    }

    public render() {
        return (
            <ListComponent>
                <ListComponent.Ordered>
                            {this.props.list.orderedTasks.map((taskKey: string, index: number) =>(
                                <ListComponent.Element>
                                    <Task onClick={() => console.log()} task={this.props.tasks[0]} />
                                </ListComponent.Element>
                            ))} 
                </ListComponent.Ordered>
            </ListComponent>
            
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