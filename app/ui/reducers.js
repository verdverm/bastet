// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import notifications from '../modules/notifications/ui/reducers';
import networks from '../modules/networks/ui/reducers';
import accounts from '../modules/accounts/ui/reducers';

const rootReducer = combineReducers({
  notifications,
  networks,
  accounts,
  router,
});

export default rootReducer;
