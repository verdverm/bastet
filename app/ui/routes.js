/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';

import App from './common/containers/App';

import HomePage from './home/HomePage';
import NetworksPage from '../modules/networks/ui/NetworksPage';
import AccountsPage from '../modules/accounts/ui/AccountsPage';
import DappsPage from '../modules/dapps/ui/DappsPage';

export default () => (
  <App>
    <Switch>
      <Route path="/networks" component={NetworksPage} />
      <Route path="/accounts/:network" component={AccountsPage} />
      <Route path="/accounts" component={AccountsPage} />
      <Route path="/dapps" component={DappsPage} />

      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
