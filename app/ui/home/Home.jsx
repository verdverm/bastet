// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col  } from 'reactstrap';

import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <Container>
        <Row>
          <h2>Welcome!</h2>
        </Row>
      </Container>
    );
  }
}
