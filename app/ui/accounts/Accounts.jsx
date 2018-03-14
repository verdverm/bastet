// @flow
import React, { Component } from 'react';
import { Container, Row, Col  } from 'reactstrap';

import styles from './Base.css';

type Props = {};

export default class Accounts extends Component<Props> {
  props: Props;

  render() {

    let { accounts } = this.props;
    console.log("accounts", accounts)

    return (
      <Container>
        <Row>
          <h2>Accounts</h2>
        </Row>
        <Row>
          <Col>
            {accounts.map( (acct) => {
              console.log("account", acct)
              return (<span key={acct} className="text-white" >{acct}</span>)
            } )}
          </Col>
        </Row>


      </Container>
    );
  }
}
