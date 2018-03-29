// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dapps from './Dapps';
import * as Actions from './actions';

type Props = {};

function mapStateToProps(state) {
  return {
    networks: state.networks.networks,
    dapps: state.dapps.dapps,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

var accounts;

class DappsPage extends Component<Props> {
  props: Props;

  handleBlock = (dappId) => {
    this.props.blockDapp(window.ipcBus, dappId);
  }

  handleUnblock = (dappId) => {
    this.props.unblockDapp(window.ipcBus, dappId);
  }

  componentWillMount() {
    this.props.getDapps(window.ipcBus);
  }

  render() {

    console.log("DAPPS", this.props)

    return (
      <Dapps
        dapps={this.props.dapps}
        networks={this.props.networks}

        handleBlock={this.handleBlock}
        handleUnblock={this.handleUnblock}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DappsPage);
