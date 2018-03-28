// @flow
import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

import styles from './styles.css';

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
        </ListGroupItemHeading>
        <ListGroupItemText className={styles.listItemText}>
          <span>ID: {notification.id}</span><br />
        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}
