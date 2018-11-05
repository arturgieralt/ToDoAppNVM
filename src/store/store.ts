import { createStore } from 'redux';
import { rootReducer } from 'src/reducers/rootReducer';

const reduxDevExtensionSetup: any = () =>
  (window as any).devToolsExtension
    ? (window as any).devToolsExtension()
    : (f: any): any => f;

export default function configureStore() {
  return createStore(rootReducer, reduxDevExtensionSetup());
}
