import React, { Component } from 'react';

import styles from './styles.css';

type Props = {};

export default class TxView extends Component<Props> {
  props: Props;

  render() {

    let { tx } = this.props;

    let {
      chainId,
      from, to, value,
      gasLimit, gasPrice,
      data,
    } = tx.txParams;

    console.log("TxView", tx)

    return (
      <div>
        <span>Bastet ID: {tx.id}</span><br />
        <hr />
        <div>
          <span>Chain ID: {chainId}</span><br />
          <span>From: {from}</span><br />
          <span>To: {to}</span><br />
          <span>Ethereum: {value}</span><br />
          <span>Gas Price: {gasPrice}</span><br />
          <span>Gas Limit: {gasLimit}</span><br />
          <span>Data: {data}</span><br />
        </div>
      </div>
    );
  }
}
