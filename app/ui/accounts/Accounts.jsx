// @flow
import React, { Component } from 'react';
import { Container, Row, Col  } from 'reactstrap';

import styles from './Base.css';

type Props = {};

export default class Accounts extends Component<Props> {
  props: Props;

  render() {

    let { network } = this.props;
    let accounts = [];

    let title = "Accounts"
    if (network.name) {
      title = network.name + " - Accounts"
    }

    return (
      <Container>
        <Row>
          <h2>{title}</h2>
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
