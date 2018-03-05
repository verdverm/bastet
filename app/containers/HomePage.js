// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from '../components/Home';

type Props = {};

function mapStateToProps(state) {
  return {
    web3: state.web3Reducer.web3Instance
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(() => {}, dispatch);
}

var accounts;

class HomePage extends Component<Props> {
  props: Props;

  checkWeb3() {
    let { web3 } = this.props;

    console.log("Checking Web3", web3)
		// Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
			console.log(accounts);

      // self.refreshBalance();
    });
  }

  render() {

    console.log(this.props)

    let { web3 } = this.props;
    console.log("Home.render()", web3)

    if (web3 !== null && web3 !== undefined) {
      this.checkWeb3();
    }
    return (
      <Home />
    );
  }
}

export default connect(mapStateToProps, null)(HomePage);
