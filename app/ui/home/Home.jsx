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
          <Col className='text-white'>
            <br />
            <span className='text-white'>First, go to networks and setup a default network.</span>
            <br />
            <br />
            <span className='text-white'>Next, try pointing a Dapp Web3 at <i>http://localhost:4545</i></span>
            <br />
            <br />
            <span className='text-white'>Then, come back here (Home) and check on notifications.</span>
          </Col>
        </Row>
        <Row>
          <Modal buttonLabel={"Modal"}/>
        </Row>
      </Container>
    );
  }
}
