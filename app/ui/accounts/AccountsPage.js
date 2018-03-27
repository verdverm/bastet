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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class AccountsPage extends Component<Props> {
  props: Props;

  componentWillMount() {
    this.props.getNetworks(window.ipcBus);
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

    console.log("AccountsPage - networks", this.props.networks)

    return (
      <Accounts network={network}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);
