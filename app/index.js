import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './ui/common/containers/Root';
import { store, history } from './ui/common/store/configureStore';

import './app.global.css';

import ProcessConnect from './proc/ProcessConnector';

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./ui/common/containers/Root', () => {
    const NextRoot = require('./ui/common/containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
