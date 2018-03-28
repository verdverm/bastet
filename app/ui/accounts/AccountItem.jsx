// @flow
import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

import styles from './Base.css';

type Props = {};

export default class AccountItem extends Component<Props> {
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
      account,
      handleUnlock, handleLock,
      handleEdit, handleDelete, handleDefault,
    } = this.props;

    return (
      <ListGroupItem className={styles.listGroup}>
        <ListGroupItemHeading className={styles.listItemHeading}>
          {account.id} {account.default === true && ('(default)')}
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
                onClick={() => {handleDefault(account.id)} }
              >
                Make Default
              </DropdownItem>

              <DropdownItem
                onClick={() => {handleAccounts(account.id)} }
              >
                Accounts
              </DropdownItem>

              <DropdownItem
                onClick={() => {handleEdit(account)} }
              >
                Edit
              </DropdownItem>

							<DropdownItem divider />

              <DropdownItem
                onClick={() => {handleDelete(account.id)} }
              >
                Delete
              </DropdownItem>
						</DropdownMenu>
					</ButtonDropdown>

        </ListGroupItemHeading>
        <ListGroupItemText className={styles.listItemText}>
          <span>
            <b>Unlocked: </b> {account.unlocked ? "Yes" : "No"}
          </span>

        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}
