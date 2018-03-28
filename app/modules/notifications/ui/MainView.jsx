// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup  } from 'reactstrap';

import PendingItem from './PendingItem';
import HistoryItem from './HistoryItem';

import styles from './styles.css';

type Props = {};

// Notifications
export default class MainView extends Component<Props> {
  props: Props;

  render() {

    console.log("NotificationView", this.props)
    let { pending, history } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <h2>Notifications</h2>
            {pending.length === 0 && <span className="text-white">There are no notifications at this time</span>}
            <ListGroup>
            {pending.map( (req) => {
              const local = req;
              return (
                <PendingItem
                  key={local.id}
                  pending={local}
                  handleApprove={this.props.handleApprove}
                  handleDeny={this.props.handleDeny}
                />
              )}
            )}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>History</h2>
            {history.length === 0 && <span className="text-white">There is no history at this time</span>}
            <ListGroup>
            {history.map( (req) => {
              const local = req;
              return (
                <HistoryItem
                  key={local.id}
                  notification={local}
                />
              )}
            )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

