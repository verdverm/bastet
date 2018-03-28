// @flow
import React, { Component } from 'react';
import {
  Button, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap';

import TxView from './TxView';
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

    let { pending, handleApprove, handleDeny } = this.props;

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
          <TxView tx={pending} />
        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}
