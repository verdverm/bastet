// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Accounts from './Accounts';
import * as Actions from './actions';

type Props = {};

function mapStateToProps(state) {
  return {
    networks: state.networks.networks,
    accounts: state.accounts.accounts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class AccountsPage extends Component<Props> {
  props: Props;

  handleUnlock = (netId, acctId) => {
    this.props.unlockAccount(window.ipcBus, netId, acctId);
  }

  handleLock = (netId, acctId) => {
    this.props.lockAccount(window.ipcBus, netId, acctId);
  }

  handleAdd = (netId, acct) => {
    this.props.addAccount(window.ipcBus, netId, acct);
  }

  handleUpdate = (netId, acct) => {
    this.props.updateAccount(window.ipcBus, netId, acct);
  }

  handleDelete = (netId, acctId) => {
    this.props.deleteAccount(window.ipcBus, netId, acctId);
  }

  handleDefault = (netId, acctId) => {
    this.props.setDefaultAccount(window.ipcBus, netId, acctId);
  }

  handleAccounts = (netId, acctId) => {
    console.log("account for: ", netId, acctId)
    this.props.history.push("/accounts/" + netId + "/" + acctId)
  }
  componentWillMount() {
    let netId = this.props.match.params.network;
    this.props.getAccounts(window.ipcBus, netId);
  }

  render() {

    let networkId = this.props.match.params.network;
    let network = {
      id: networkId
    }
    let networks = this.props.networks;
    if (networkId && networks) {
      let net = networks[networkId];
      if (net) {
        network = net;
      }
    }

    let accounts = this.props.accounts[networkId];

    console.log("AccountsPage - networks", this.props.networks)

    return (
      <Accounts
        network={network}
        accounts={accounts}

        handleUnlock={this.handleUnlock}
        handleLock={this.handleLock}
        handleAdd={this.handleAdd}
        handleUpdate={this.handleUpdate}
        handleDelete={this.handleDelete}
        handleDefault={this.handleDefault}
        handleAccounts={this.handleAccounts}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);
