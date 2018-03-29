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
      dapp, handleDetails,
      handleEdit, handleDelete,
      handleUnblock, handleBlock,
    } = this.props;

    return (
      <ListGroupItem className={styles.listGroup}>
        <ListGroupItemHeading className={styles.listItemHeading}>
          {dapp.origin} {dapp.dangerous ? '(DANGEROUS, perminently blocked)' : dapp.blocked ? '(blocked)' : '(permitted)'}
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
                onClick={() => {handleDetails(dapp.id)} }
              >
                Details
              </DropdownItem>

              <DropdownItem
                onClick={() => {handleEdit(dapp)} }
              >
                Edit
              </DropdownItem>

              <DropdownItem
                onClick={() => { dapp.blocked ? handleUnblock(dapp.id) : handleBlock(dapp.id)} }
                disabled={dapp.dangerous ? true : false}
              >
                {dapp.blocked ? 'Unblock' : 'Block'}
              </DropdownItem>

              <DropdownItem
                onClick={() => {handleDelete(dapp.id)} }
              >
                Delete
              </DropdownItem>
						</DropdownMenu>
					</ButtonDropdown>

        </ListGroupItemHeading>
        <ListGroupItemText className={styles.listItemText}>
        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}

