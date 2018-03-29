// @flow
import React, { Component } from 'react';
import {
  Container, Row, Col,
  ListGroup,
  Button
} from 'reactstrap';

import styles from './Base.css';

import DappItem from './DappItem';

type Props = {};

export default class Dapps extends Component<Props> {
  props: Props;

  render() {

    let { dapps } = this.props
    console.log("DappView", dapps)

    if (dapps === undefined || dapps === null) {
      dapps = {};
    }
    return (
      <Container>
        <Row>
          <h2>Dapps</h2>
        </Row>
        <Row>
          <Col>
            <ListGroup>
            {Object.entries(dapps).map( ([id, dapp]) => {
              const localId = id;
              const localDapp = dapp;
              console.log("Dapp:", dapp)
              return (
                <DappItem key={localDapp.origin} dapp={localDapp} {...this.props} />
              )}
            )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
