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
    if (accounts === undefined || accounts === null) {
      accounts = {};
    } else if (accounts.error) {
      error = accounts.error;
      accounts = {};
    }

    return (
      <Container>
        <Row>
          <Col xs='10'>
            <h2>{title}</h2>
          </Col>
          <Col xs='2'>
            <Button color='white' className={styles.optionsButton}>Refresh</Button>
          </Col>
        </Row>
        <Row>
          <Col xs='10'>
            <h4>{error}</h4>
          </Col>
          <Col xs='2'>
            <AddAccountModal
              handleSave={this.props.handleAdd}
            />
          </Col>
        </Row>
        <Row>
          <br />
        </Row>
        <Row>
          <Col>
            <ListGroup>
            {Object.entries(accounts).map( ([id, acct]) => {
              const localId = id;
              const localAcct = acct;
              return (
                <AccountItem key={localAcct.id} account={localAcct} {...this.props} />
              )}
            )}
            </ListGroup>
          </Col>
        </Row>


      </Container>
    );
  }
}
