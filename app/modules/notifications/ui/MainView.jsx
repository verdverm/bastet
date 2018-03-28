// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button  } from 'reactstrap';

// import Modal from './Modal';

import styles from './styles.css';

type Props = {};

// Notifications
export default class MainView extends Component<Props> {
  props: Props;

  render() {
    console.log(this.props)

    return (
      <Container>
        <Row>
          <h2>Notifications</h2>
        </Row>
        <Row>
          List of notifications to come
        </Row>
      </Container>
    );
  }
}

