// @flow
import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

import styles from './styles.css';

type Props = {};

export default class PendingItem extends Component<Props> {
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

    let {
      pending,
      handleApprove, handleDeny,
    } = this.props;

    console.log("PendingItem:", this.props)

    let message = "Transaction Details: " + JSON.stringify(pending.txParams)

    return (
      <ListGroupItem className={styles.listGroup}>
        <ListGroupItemHeading className={styles.listItemHeading}>
          {pending.type}
          <span className="float-right">
            <Button size="sm"  color="success" onClick={() => handleApprove(pending)}>Approve</Button>
            {" "}
            <Button size="sm" color="danger" onClick={() => handleDeny(pending)}>Deny</Button>
          </span>
        </ListGroupItemHeading>
        <ListGroupItemText className={styles.listItemText}>
          <span>ID: {pending.id}</span><br />
          <span className="text-muted" style={{wordWrap:"break-word"}}>{message}</span>
        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}
