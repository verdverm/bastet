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
  +request: object
};

const initialState = {
  request: null,
}

export default function homeReducer(state: stateType = initialState, action: actionType) {
  console.log("HOME ACTION", action)
  switch (action.type) {
    case PENDING_REQUEST:
      return Object.assign({}, state, {
        request: action.payload,
      })
    case APPROVE_REQUEST:
      return Object.assign({}, state, {
        request: null,
      })
    case DENY_REQUEST:
      return Object.assign({}, state, {
        request: null,
      })
    default:
      return state;
  }
}

