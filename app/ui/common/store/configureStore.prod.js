// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory, createHashHistroy } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

import * as homeActions from '../../home/actions';

const history = createBrowserHistory();
// const history = createHashHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}

const store = configureStore();

export default { store, history };
