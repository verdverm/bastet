import React, { Component } from 'react';

import styles from './styles.css';

type Props = {};

export default class DappView extends Component<Props> {
  props: Props;

  render() {

    let { dapp } = this.props;

    console.log("DappView", dapp)

    return (
      <div>
        <span>Bastet ID: {dapp.id}</span><br />
        <span>Origin: {dapp.origin}</span><br />
      </div>
    );
  }
}
