// @flow
import { ACCOUNTS_LOADED } from './actions';

type actionType = {
  +type: string
};

export type accountsStateType = {
  +accounts: array
};

const initialState = {
  accounts: [],
}

export default function accountsReducer(state: accountsStateType = initialState, action: actionType) {
  switch (action.type) {
    case ACCOUNTS_LOADED:
      return Object.assign({}, state, {
        accounts: action.payload,
      })
    default:
      return state;
  }
}
