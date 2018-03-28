// @flow
import React, { Component } from 'react';
import {
  Container, Row, Col,
  ListGroup,
  Button
} from 'reactstrap';

import AddAccountModal from './AddAccountModal';
import AccountItem from './AccountItem';

import styles from './Base.css';

type Props = {};

export default class Accounts extends Component<Props> {
  props: Props;

  render() {

    let { network, accounts } = this.props;

    let title = "Accounts"
    if (network.name) {
      title = network.name + " - Accounts"
    }

    var error = null;

    if (accounts.error) {
      error = accounts.error;
      accounts = [];
    } else if (accounts === undefined || accounts === null) {
      accounts = [];
    }

    const defaultAccount = accounts.filter((acct) => acct.default)

    return (
      <Container>
        <Row>
          <h2>{title}</h2>
        </Row>
        <Row>
          <Col>
          <h4>{error}</h4>
          </Col>
          <Col>
            <AddAccountModal
              handleSave={this.props.handleAdd}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              { defaultAccount && (
              <AccountItem key={defaultAccount.id} account={defaultAccount} {...this.props} />
              )}
            {accounts.map( (account) => {
              if (account.default === true) { return }
              const localAccount = account;
              return (
                <AccountItem key={localAccount.id} account={localAccount} {...this.props} />
              )}
            )}
            </ListGroup>
          </Col>
        </Row>


      </Container>
    );
  }
}
