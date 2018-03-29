// @flow
import { actionType, DAPPS_LOADED } from './actions';

export type stateType = {
  +dapps: object
};

const initialState = {
  dapps: {},
}

export default function dapps(state: stateType = initialState, action: actionType) {
  switch (action.type) {

    case DAPPS_LOADED:
      console.log("updating dapps state")
      return Object.assign({}, state, {
        dapps: action.payload,
      })

    default:
      return state;
  }
}


