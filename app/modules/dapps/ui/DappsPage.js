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

  componentWillMount() {
    this.props.getDapps(window.ipcBus);
  }

  render() {

    console.log("DAPPS", this.props)

    return (
      <Dapps {...this.props}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DappsPage);
