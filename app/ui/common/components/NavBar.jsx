// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import styles from './NavBar.css';

type Props = {};

export default class NavBar extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light expand="sm">
          <Link to="/">
              <h2 className="text-warning">Bastet</h2>
          </Link>
          <NavbarToggler onClick={this.toggle} className="text-white"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/notifications">Notifications</Link>
              </NavItem>
              <span> - </span>
              <NavItem>
                <Link to="/networks">Networks</Link>
              </NavItem>
              <span> - </span>
              <NavItem>
                <Link to="/dapps">Dapps</Link>
              </NavItem>
							<UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className={styles.dropdown}>
                  More
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/" className={styles.dropdownHome}>
                      Home
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to="/" className={styles.dropdownHome}>
                      Demos (coming soon)
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/" className={styles.dropdownHome}>
                      Wallets (coming soon)
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to="/" className={styles.dropdownHome}>
                      Mystery Method
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
