// @flow
import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

import EditNetworkModal from './EditNetworkModal';

import styles from './Base.css';

type Props = {};

export default class NetworkItem extends Component<Props> {
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
      network, handleConnect, handleDisconnect,
      handleAdd, handleEdit, handleDelete, handleDefault,
      handleAccounts,
    } = this.props;

    return (
      <ListGroupItem className={styles.listGroup}>
        <ListGroupItemHeading className={styles.listItemHeading}>
          {network.name} {network.default === true && ('(default)')}
          <ButtonDropdown
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
            className={styles.optionsButton}
          >
						<DropdownToggle caret size='sm'>
							Options
						</DropdownToggle>
						<DropdownMenu>

              <DropdownItem
                onClick={() => {handleDefault(network.id)} }
              >
                Make Default
              </DropdownItem>

              <DropdownItem
                onClick={() => {handleAccounts(network.id)} }
              >
                Accounts
              </DropdownItem>

              <DropdownItem
                onClick={() => {handleEdit(network)} }
              >
                Edit
              </DropdownItem>

							<DropdownItem divider />

              <DropdownItem
                onClick={() => {handleDelete(network.id)} }
              >
                Delete
              </DropdownItem>
						</DropdownMenu>
					</ButtonDropdown>

          <Button size="sm"
            className={styles.connectionButton}
            color={network.connected ? 'success' : 'secondary'}
            onClick={() => {network.connected ? handleDisconnect(network.id) : handleConnect(network.id)} }
          >
            {network.connected ? 'Connected   ' : 'Disconnected'}
          </Button>
        </ListGroupItemHeading>
        <ListGroupItemText className={styles.listItemText}>
          <span>
            <b>Location: </b> {network.location}
          </span>

        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}
