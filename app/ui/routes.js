/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';

import App from './main/App';
import HomePage from './home/HomePage';
import NotificationsPage from '../modules/notifications/ui/MainPage';
import NetworksPage from '../modules/networks/ui/NetworksPage';
import AccountsPage from '../modules/accounts/ui/AccountsPage';
import DappsPage from '../modules/dapps/ui/DappsPage';

export default () => (
  <App>
    <Switch>
      <Route path="/notifications" component={NotificationsPage} />
      <Route path="/networks" component={NetworksPage} />
      <Route path="/accounts/:network" component={AccountsPage} />
      <Route path="/accounts" component={AccountsPage} />
      <Route path="/dapps" component={DappsPage} />

      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
