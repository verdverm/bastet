// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button  } from 'reactstrap';

import Modal from './Modal';

import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    let {sayHello} = this.props;

    return (
      <Container>
        <Row>
          <h2>Welcome!</h2>
        </Row>
        <Row>
          <Modal buttonLabel={"Modal"}/>
        </Row>
      </Container>
    );
  }
}
