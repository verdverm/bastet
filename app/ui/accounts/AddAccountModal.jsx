/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import {
  Col,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input,
} from 'reactstrap';

import styles from './Base.css';

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSave = () => {
    var name = document.getElementById('saveAccountName').value;
    var account = {
      name,
    }
    this.props.handleSave(account);
    this.toggle()
  }

  render() {
    let showModal = this.state.modal ? true : false;

    return (
      <span>
        <Button
          color={ this.props.buttonColor || 'success' }
          size={ this.props.buttonSize || 'md' }
          className={styles.optionsButton}
          onClick={() => {this.toggle()}}
        >
          Add Account
        </Button>
        <Modal isOpen={showModal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="text-muted">Add An Account</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="saveAccountName" sm={2} className={styles.formLabel}>Name</Label>
                <Col sm={10}>
                  <Input type="text" name="name" id="saveAccountName" placeholder="Account Name" />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter className="clearfix">
            <Button className="float-left"  color="success" onClick={() => this.handleSave()}>Save</Button>
            <Button className="float-right" color="danger" onClick={() => this.toggle()}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}

export default AddModal;

