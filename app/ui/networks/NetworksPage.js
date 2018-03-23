// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Networks from './Networks';
import * as Actions from './actions';

type Props = {};

function mapStateToProps(state) {
  return {
    networks: state.networks.networks,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class NetworksPage extends Component<Props> {
  props: Props;

  handleConnect = (id) => {
    console.log("connecting: " + id)
    this.props.connectNetwork(window.ipcBus, id);
  }

  handleDisconnect = (id) => {
    console.log("disconnecting: " + id)
    this.props.disconnectNetwork(window.ipcBus, id);
  }

  componentWillMount() {
    console.log(this.props)
    this.props.listenNetworks(window.ipcBus);
    this.props.getNetworks(window.ipcBus);
  }

  componentWillUnmount() {
    console.log(this.props)
    this.props.unlistenNetworks(window.ipcBus);
  }

  render() {

    console.log(this.props)

    let { networks } = this.props;

    return (
      <Networks
        networks={networks}
        handleConnect={this.handleConnect}
        handleDisconnect={this.handleDisconnect}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworksPage);
