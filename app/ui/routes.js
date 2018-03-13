/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';

import AccountsPage from './containers/AccountsPage';
import NetworksPage from './containers/NetworksPage';
import DappsPage from './containers/DappsPage';

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
