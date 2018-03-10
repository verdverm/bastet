// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Bastet - Networks</h2>

          <br />
          <Link to="/">Home</Link>
          <br />
          <Link to="/accounts">Accounts</Link>
          <br />
          <Link to="/networks">Networks</Link>
          <br />
          <Link to="/dapps">DApps</Link>
          <br />

        </div>
      </div>
    );
  }
}
