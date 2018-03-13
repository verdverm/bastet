// @flow
import React from 'react';
import getWeb3 from '../../utils/web3/getWeb3';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
