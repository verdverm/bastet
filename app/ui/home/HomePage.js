// @flow
import React, { Component } from 'react';

import Home from './Home';

type Props = {};

class HomePage extends Component<Props> {
  props: Props;

  render() {

    console.log(this.props)

    return (
      <Home />
    );
  }
}

export default HomePage;
