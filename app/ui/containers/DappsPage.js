// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from '../components/Dapps';

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

class HomePage extends Component<Props> {
  props: Props;

  checkWeb3() {
    let { web3s } = this.props;

    console.log("Checking Web3", web3s)
		// Get the initial account balance so it can be displayed.
    for (let name in web3s) {
      let network = web3s[name]
      if ( network === null || network === undefined ) {
        continue
      }
      network.eth.getAccounts(function(err, accs) {
        if (err != null) {
          console.log("There was an error fetching your accounts.");
          return;
        }

        accounts = accs;
        console.log(name, ":", accounts);

        if (accs.length == 0) {
          console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
          return;
        }

        // self.refreshBalance();
      });
    }
  }

  render() {

    console.log(this.props)

    let { web3s } = this.props;

    this.checkWeb3();

    return (
      <Home />
    );
  }
}

export default connect(mapStateToProps, null)(HomePage);
