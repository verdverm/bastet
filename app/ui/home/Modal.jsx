/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import styles from './Modal.css';

import * as HomeActions from './actions';

import { setReceiver } from '../ipc/send';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSigning = async (transaction) => {
    this.props.pendingRequest(transaction)

    do {
      console.log("check signing", this.props.request)
      await sleep(500)
    } while (this.props.request !== null)
  }

  handleApprove = (transaction) => {
    window.ipcBus.send("app/signing-approve", true);
    this.props.approveRequest(transaction)
  }

  handleDeny = (transaction) => {
    window.ipcBus.send("app/signing-approve", false);
    this.props.denyRequest(transaction)
  }

  componentWillMount() {
    setReceiver(this.handleSigning)
  }

  render() {
    let { request, approveRequest, denyRequest } = this.props;
    let showModal = request === null ? false : true
    let message = "Transaction Details: " + JSON.stringify(request)
    console.log("Modal", this.props)
    return (
      <div>
        <Modal isOpen={showModal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} className="text-muted">Pending Signing Request</ModalHeader>
          <ModalBody>
            <span className="text-muted" style={{wordWrap:"break-word"}}>{message}</span>
          </ModalBody>
          <ModalFooter className="clearfix">
            <Button className="float-left"  color="success" onClick={() => this.handleApprove(request)}>Approve</Button>
            <Button className="float-right" color="danger" onClick={() => this.handleDeny(request)}>Deny</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    request: state.home.request
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);
