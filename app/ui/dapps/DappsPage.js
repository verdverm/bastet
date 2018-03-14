// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dapps from './Dapps';

type Props = {};

function mapStateToProps(state) {
  return {
    web3s: state.web3Reducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(() => {}, dispatch);
}

var accounts;

class DappsPage extends Component<Props> {
  props: Props;

  render() {

    console.log(this.props)

    return (
      <Dapps />
    );
  }
}

export default connect(mapStateToProps, null)(DappsPage);
