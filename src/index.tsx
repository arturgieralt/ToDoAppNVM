import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/AppContainer';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/store';

const store = configureStore();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);
