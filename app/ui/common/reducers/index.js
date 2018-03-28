// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

// standard
import home from '../../home/reducers';

// modules
import networks from '../../../modules/networks/ui/reducers';
import accounts from '../../../modules/accounts/ui/reducers';

const rootReducer = combineReducers({
  home,
  networks,
  accounts,
  router,
});

export default rootReducer;
