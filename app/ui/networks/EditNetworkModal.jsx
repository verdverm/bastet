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

class EditModal extends React.Component {

  doSave = () => {
    let net = {
      id: this.props.network.id,
      name: document.getElementById('editNetworkName').value,
      location: document.getElementById('editNetworkLocation').value,
    }
    this.props.handleSave(net)
  }

  render() {
    let { network, showModal, handleCancel, handleToggle } = this.props;
    return (
      <span>
        <Modal isOpen={showModal} toggle={handleToggle}>
          <ModalHeader toggle={this.toggle} className="text-muted">{this.props.title}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="editNetworkName" sm={2} className={styles.formLabel}>Name</Label>
                <Col sm={10}>
                  <Input type="text" name="name" id="editNetworkName" placeholder="Network Name" defaultValue={network && network.name} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="editNetworkLocation" sm={2} className={styles.formLabel}>Location</Label>
                <Col sm={10}>
                  <Input type="text" location="location" id="editNetworkLocation" placeholder="Network Connection String"  defaultValue={network && network.location}/>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter className="clearfix">
            <Button className="float-left"  color="success" onClick={() => this.doSave()}>Save</Button>
            <Button className="float-right" color="danger" onClick={() => handleCancel()}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}

export default EditModal;
