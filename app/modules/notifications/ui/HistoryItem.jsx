// @flow
import React, { Component } from 'react';
import {
  Button, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap';

import styles from './styles.css';

import TxView from './TxView';
import DappView from './DappView';

type Props = {};

export default class HistoryItem extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {

    let { notification } = this.props;
    console.log("Hist", notification)

    let message = "Transaction Details: " + JSON.stringify(notification.txParams)

    return (
      <ListGroupItem className={styles.listGroup}>
        <ListGroupItemHeading className={styles.listItemHeading}>
          <span className={notification.approve ? 'text-success' : 'text-danger'}>
            <b>{notification.approve ? "Approved" : "Denied"}</b>
          </span>
          {notification.type}
          <Button size="sm" color="primary" className="float-right"
            onClick={() => {this.toggle()} }
          >
            Details
          </Button>
        </ListGroupItemHeading>
        <ListGroupItemText className={styles.listItemText}>
          {this.state.dropdownOpen ?
            ( notification.type === 'Signing Request' ?
                <TxView tx={notification} />
              :
                <DappView dapp={notification} />
            )
            :
            <span>ID: {notification.id}</span>
          }
        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}
