// @flow
import React from 'react';

import NavBar from '../components/NavBar';

import { initIpc } from '../../ipc';

initIpc();

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}
