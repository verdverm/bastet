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
    this.props.connectNetwork(window.ipcBus, id);
  }

  handleDisconnect = (id) => {
    this.props.disconnectNetwork(window.ipcBus, id);
  }

  handleAdd = (network) => {
    this.props.addNetwork(window.ipcBus, network);
  }

  handleUpdate = (network) => {
    this.props.updateNetwork(window.ipcBus, network);
  }

  handleDelete = (id) => {
    this.props.deleteNetwork(window.ipcBus, id);
  }

  handleDefault = (id) => {
    this.props.setDefaultNetwork(window.ipcBus, id);
  }

  handleAccounts = (id) => {
    console.log("accounts for: ", id)
    this.props.history.push("/accounts/" + id)
  }

  componentWillMount() {
    this.props.getNetworks(window.ipcBus);
  }

  componentWillUnmount() {
    // console.log(this.props)
    // this.props.unlistenNetworks(window.ipcBus);
  }

  render() {

    let { networks } = this.props;

    return (
      <Networks
        networks={networks}
        handleConnect={this.handleConnect}
        handleDisconnect={this.handleDisconnect}
        handleAdd={this.handleAdd}
        handleUpdate={this.handleUpdate}
        handleDelete={this.handleDelete}
        handleDefault={this.handleDefault}
        handleAccounts={this.handleAccounts}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworksPage);
