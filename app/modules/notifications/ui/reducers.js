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
  +requests: array
};

const initialState = {
  requests: [],
}

export default function notifications(state: stateType = initialState, action: actionType) {
  switch (action.type) {
    case PENDING_REQUEST:
      var newReqs = state.slice();
      newReqs.push(action.payload)
      return Object.assign({}, state, {
        requests: newReqs,
      })

    case APPROVE_REQUEST:
      var newReqs = state.slice();
      console.log(action)
      return Object.assign({}, state, {
        requests: newReqs,
      })

    case DENY_REQUEST:
      var newReqs = state.slice();
      console.log(action)
      return Object.assign({}, state, {
        requests: newReqs,
      })

    default:
      return state;
  }
}


