import { combineReducers } from 'redux';
import { ReduxState } from 'src/store/store.types';
import { tasksReducer } from './tasks';
import { listsReducer } from './lists';

export const rootReducer = combineReducers<ReduxState>({
    tasks: tasksReducer,
    lists: listsReducer
  });