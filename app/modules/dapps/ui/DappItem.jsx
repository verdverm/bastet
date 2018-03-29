// @flow
import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

import styles from './Base.css';

type Props = {};

export default class DappItem extends Component<Props> {
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
      dapp,
    } = this.props;

    return (
      <ListGroupItem className={styles.listGroup}>
        <ListGroupItemHeading className={styles.listItemHeading}>
          {dapp.origin} {dapp.blocked ? '(blocked)' : '(permitted)'}
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
                onClick={() => {handleDefault(dapp.origin)} }
              >
                Make Default
              </DropdownItem>

              <DropdownItem
                onClick={() => {handleAccounts(dapp.origin)} }
              >
                Accounts
              </DropdownItem>

              <DropdownItem
                onClick={() => {handleEdit(dapp)} }
              >
                Edit
              </DropdownItem>

							<DropdownItem divider />

              <DropdownItem
                onClick={() => {handleDelete(dapp.origin)} }
              >
                Delete
              </DropdownItem>
						</DropdownMenu>
					</ButtonDropdown>

        </ListGroupItemHeading>
        <ListGroupItemText className={styles.listItemText}>
          details...
        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}

