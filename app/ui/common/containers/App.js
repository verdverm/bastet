// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NavBar from '../components/NavBar';

import { initIpc } from '../../ipc';

import * as Actions from '../actions/listeners';


type Props = {
  children: React.Node
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}


class App extends React.Component<Props> {
  props: Props;

  componentWillMount() {
    initIpc().then(() => {
      this.props.listenNetworks(window.ipcBus);
      this.props.listenAccounts(window.ipcBus);
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
