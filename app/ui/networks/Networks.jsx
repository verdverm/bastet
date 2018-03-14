// @flow
import React, { Component } from 'react';
import { Container, Row, Col  } from 'reactstrap';

import styles from './Base.css';

type Props = {};

export default class Networks extends Component<Props> {
  props: Props;

  render() {

    let { networks } = this.props;
    console.log("networks", networks)

    return (
      <Container>
        <Row>
          <h2>Networks</h2>
        </Row>
        <Row>
          <Col>
            {networks.map( (net) => {
              console.log("network", net)
              return (<span key={net} className="text-white" >{net}</span>)
            } )}
          </Col>
        </Row>


      </Container>
    );
  }
}
