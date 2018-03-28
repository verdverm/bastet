// @flow
import {
  PENDING_REQUEST,
  APPROVE_REQUEST,
  DENY_REQUEST,
} from './actions';

type actionType = {
  +type: string
};

export type stateType = {
  +pending: array,
  +history: array,
};

const initialState = {
  pending: [],
  history: [],
}

export default function notifications(state: stateType = initialState, action: actionType) {
  switch (action.type) {
    case PENDING_REQUEST:
      console.log(action)

      var pending = state.pending.slice();
      var history = state.history.slice();

      pending.push(action.payload)

      return Object.assign({}, state, {
        pending,
        history,
      })

    case APPROVE_REQUEST:
      console.log(action)

      var pending = state.pending.slice();
      console.log("Approve pending", pending)
      pending = pending.filter(elem => elem.id !== action.payload.id)
      console.log("Approve pending2", pending)

      var history = state.history.slice();
      history.push(action.payload)

      return Object.assign({}, state, {
        pending,
        history,
      })

    case DENY_REQUEST:
      console.log(action)

      var pending = state.pending.slice();
      pending = pending.filter(elem => elem.id !== action.payload.id)

      var history = state.history.slice();
      history.push(action.payload)

      return Object.assign({}, state, {
        pending,
        history,
      })

    default:
      return state;
  }
}


