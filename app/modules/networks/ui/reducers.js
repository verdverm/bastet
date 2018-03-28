// @flow
import { actionType, NETWORKS_LOADED } from './actions';

export type stateType = {
  +networks: object
};

const initialState = {
  networks: {},
}

export default function networks(state: stateType = initialState, action: actionType) {
  switch (action.type) {

    case NETWORKS_LOADED:
      return Object.assign({}, state, {
        networks: action.payload,
      })

    default:
      return state;
  }
}

