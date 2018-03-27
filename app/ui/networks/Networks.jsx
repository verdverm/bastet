// @flow
import React, { Component } from 'react';
import {
  Container, Row, Col,
  ListGroup,
  Button
} from 'reactstrap';

import NetworkItem from './NetworkItem';
import AddNetworkModal from './AddNetworkModal';
import EditNetworkModal from './EditNetworkModal';

import styles from './Base.css';

type Props = {};

export default class Networks extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
      editNetwork: null
    };
  }

  toggle = () => {
    this.setState({
      editModal: !this.state.editModal
    });
  }

  handleSave = (net) => {
    this.props.handleUpdate(net);
    this.toggle()
  }

  handleEdit = (network) => {
    console.log("edit: ", network)
    this.setState({
      editNetwork: network
    });
    this.toggle()
  }

  render() {

    let { networks } = this.props;

    console.log("Networks:", this, this.props)

    return (
      <Container>
        <Row>
          <Col>
            <h2>Networks</h2>
          </Col>
          <Col>
            <AddNetworkModal
              title="Add Network"
              buttonLabel="Add Network"
              handleSave={this.props.handleAdd}
            />
            <EditNetworkModal
              title="Edit Network"
              buttonLabel="Save Network"
              showModal={this.state.editModal}
              network={this.state.editNetwork}
              handleSave={this.handleSave}
              handleCancel={this.toggle}
              handleToggle={this.toggle}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <ListGroup>
            {Object.entries(networks).map( ([id, net]) => {
              const localId = id;
              const localNet = net;
              return (
                <NetworkItem key={localId} network={localNet} handleEdit={this.handleEdit} {...this.props} />

              )}
            )}
            </ListGroup>
          </Col>
        </Row>

      </Container>
    );
  }
}
