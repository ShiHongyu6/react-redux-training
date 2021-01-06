import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(rootReducer) {

  const composeEnhancer = composeWithDevTools();
  const store = createStore(rootReducer, rootReducer(), composeEnhancer);
  return store;
}
