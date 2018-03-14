/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';

import App from './common/containers/App';

import HomePage from './home/HomePage';
import AccountsPage from './accounts/AccountsPage';
import NetworksPage from './networks/NetworksPage';
import DappsPage from './dapps/DappsPage';

export default () => (
  <App>
    <Switch>
      <Route path="/accounts" component={AccountsPage} />
      <Route path="/networks" component={NetworksPage} />
      <Route path="/dapps" component={DappsPage} />

      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
