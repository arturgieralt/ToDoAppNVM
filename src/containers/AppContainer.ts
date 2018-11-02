import { connect } from 'react-redux';
import * as actions from '../actions/actionCreators';
import { ReduxState} from 'src/store/store.types';
import App from 'src/components/App';


const mapStateToProps = (state: ReduxState ): ReduxState => (state);

const mapDispatchToProps = {
    addTask: actions.addTask,
    addList: actions.addList
}

export default connect(mapStateToProps, mapDispatchToProps)(App as any);