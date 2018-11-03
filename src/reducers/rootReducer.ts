import { combineReducers } from 'redux';
import { IReduxState } from 'src/store/store.types';
import { tasksReducer } from './tasks';
import { listsReducer } from './lists';

export const rootReducer = combineReducers<IReduxState>({
    tasks: tasksReducer,
    lists: listsReducer
  });