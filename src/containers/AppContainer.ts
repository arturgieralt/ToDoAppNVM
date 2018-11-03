import { connect } from 'react-redux';
import * as actions from '../actions/actionCreators';
import { IReduxState} from 'src/store/store.types';
import App from 'src/components/App';


const mapStateToProps = (state: IReduxState ): IReduxState => (state);

const mapDispatchToProps = {
    addTask: actions.addTask,
    addList: actions.addList
}

export default connect(mapStateToProps, mapDispatchToProps)(App as any);