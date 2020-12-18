import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(createLogger())
  )
);

export default store;
