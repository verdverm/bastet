// @flow
import React, { Component } from 'react';

// Notifications
import MainView from './MainView';

type Props = {};

class MainPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <MainView {...this.props}/>
    );
  }
}

// Notifications
export default MainPage;

