// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import home from '../../home/reducers';
import networks from '../../networks/reducers';
import web3Reducer from './web3';

const rootReducer = combineReducers({
  web3Reducer,
  home,
  networks,
  router,
});

export default rootReducer;
