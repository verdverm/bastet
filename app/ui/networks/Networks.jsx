// @flow
import React, { Component } from 'react';
import {
  Container, Row, Col,
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Button,
} from 'reactstrap';

import styles from './Base.css';

type Props = {};

export default class Networks extends Component<Props> {
  props: Props;

  render() {

    let { networks, handleConnect, handleDisconnect } = this.props;
    console.log("networks", networks)

    return (
      <Container>
        <Row>
          <h2>Networks</h2>
        </Row>
        <Row>
          <Col>
            <ListGroup>
            {Object.entries(networks).map( ([id, net]) => {
              console.log("network: " + id, net)
              const localId = id;
              return (
                <ListGroupItem key={localId} className={styles.listGroup}>
                  <ListGroupItemHeading className={styles.listItemHeading}>
                    {net.name}
                    <Button size="sm"
                      className={styles.connectionButton}
                      color={net.connected ? 'success' : 'secondary'}
                      onClick={() => {net.connected ? handleDisconnect(localId) : handleConnect(localId)} }
                    >
                      {net.connected ? 'Connected   ' : 'Disconnected'}
                    </Button>
                  </ListGroupItemHeading>
                  <ListGroupItemText className={styles.listItemText}>
                    <span>
                      <b>Location: </b> {net.location}
                    </span>
                  </ListGroupItemText>
                </ListGroupItem>)
            } )}
            </ListGroup>
          </Col>
        </Row>


      </Container>
    );
  }
}
