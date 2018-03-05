// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import web3Reducer from '../utils/web3/web3Reducer'

const rootReducer = combineReducers({
  counter,
  router,
  web3Reducer,
});

export default rootReducer;
