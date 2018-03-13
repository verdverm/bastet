// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import web3Reducer from './web3';

const rootReducer = combineReducers({
  counter,
  router,
  web3Reducer,
});

export default rootReducer;
