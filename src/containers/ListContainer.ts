import { connect } from 'react-redux';
import * as actions from '../actions/actionCreators';
import { IReduxState } from 'src/store/store.types';
import {
  IListStateProps,
  IListDispatchProps
} from '../components/TaskList/TaskList.types';
import { TaskList } from 'src/components/TaskList/TaskList';

const mapStateToProps = (state: IReduxState): IListStateProps => ({
  tasks: state.tasks
});

const mapDispatchToProps: IListDispatchProps = {
  addTask: actions.addTask,
  changeTaskStatus: actions.changeTaskStatus,
  changeTaskOrder: actions.changeTaskOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
