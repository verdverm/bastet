// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import home from '../../home/reducers';
import networks from '../../networks/reducers';
import accounts from '../../accounts/reducers';

const rootReducer = combineReducers({
  home,
  networks,
  accounts,
  router,
});

export default rootReducer;
