// @flow
import { ACCOUNTS_LOADED } from './actions';

type actionType = {
  +type: string
};

export type accountsStateType = {
  +accounts: object
};

const initialState = {
  accounts: {},
}

export default function accounts(state: accountsStateType = initialState, action: actionType) {
  switch (action.type) {
    case ACCOUNTS_LOADED:
      return Object.assign({}, state, {
        accounts: action.payload,
      })
    default:
      return state;
  }
}
