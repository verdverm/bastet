// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Accounts from './Accounts';

type Props = {};

function mapStateToProps(state) {
  return {
    web3s: state.web3Reducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(() => {}, dispatch);
}

class AccountsPage extends Component<Props> {
  props: Props;

  getAccounts() {
    let { web3s } = this.props;

    let accounts = [];
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

        if (accs.length == 0) {
          console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
          return;
        }

        accounts = accounts.concat(accs)
        console.log("ACCTS:", accounts)
        // self.refreshBalance();
      });
    }

    return accounts
  }

  render() {

    console.log(this.props)

    let { web3s } = this.props;

    let accounts = this.getAccounts();

    return (
      <Accounts accounts={accounts}/>
    );
  }
}

export default connect(mapStateToProps, null)(AccountsPage);
