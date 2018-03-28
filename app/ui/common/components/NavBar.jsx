// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    pending: state.notifications.pending,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

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
  DropdownItem,
  Badge,
} from 'reactstrap';

import styles from './NavBar.css';

type Props = {};

class NavBar extends Component<Props> {
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

  handleLink = (route) => {
    console.log("REDIRECT:", route, this.props)
    this.props.history.push(route)
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light expand="sm">
          <Link to="/">
              <h2 className="text-warning">Bastet</h2>
          </Link>
          <NavbarToggler onClick={this.toggle} className={styles.menubutton}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {this.props.pending.length > 0 && <Badge color='warning'>{this.props.pending.length}</Badge>}
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
              <span> - </span>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className={styles.dropdown}>
                  More
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>click the words</DropdownItem>
                  <DropdownItem>
                    <Link to="/" className={styles.dropdownHome}>
                      Home
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to="/signers" className={styles.dropdownHome}>
                      Signers (coming soon)
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/wallets" className={styles.dropdownHome}>
                      Wallets (coming soon)
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/settings" className={styles.dropdownHome}>
                      Settings (coming soon)
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/demos" className={styles.dropdownHome}>
                      Demos (coming soon)
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
