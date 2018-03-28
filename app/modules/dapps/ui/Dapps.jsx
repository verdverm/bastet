// @flow
import React, { Component } from 'react';
import { Container, Row, Col  } from 'reactstrap';

import styles from './Base.css';

type Props = {};

export default class Dapps extends Component<Props> {
  props: Props;

  render() {
    return (
      <Container>
        <Row>
          <h2>Dapps</h2>
        </Row>
        <Row>
          List, notifications, and settings coming soon.
        </Row>
      </Container>
    );
  }
}
