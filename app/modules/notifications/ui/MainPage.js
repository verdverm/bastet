// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Notifications
import MainView from './MainView';
import * as Actions from './actions';

function mapStateToProps(state) {
  return {
    pending: state.notifications.pending,
    history: state.notifications.history,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

type Props = {};

class MainPage extends Component<Props> {
  props: Props;

  handleApprove = (req) => {
    req.approve = true;
    console.log("HANDLE APPROVE", req)
    window.ipcBus.send("app/notifications:" + req.id, req);
    this.props.approveRequest(req)
  }

  handleDeny = (req) => {
    req.approve = false;
    console.log("HANDLE DENY", req)
    window.ipcBus.send("app/notifications:" + req.id, req);
    this.props.denyRequest(req)
  }

  render() {
    console.log("NotifyPage", this.props)
    return (
      <MainView
        pending={this.props.pending}
        history={this.props.history}
        handleApprove={this.handleApprove}
        handleDeny={this.handleDeny}
      />
    );
  }
}

// Notifications
// export default MainPage;
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

