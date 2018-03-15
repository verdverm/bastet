import { WEB3_INITIALIZED } from '../actions/web3';

const initialState = {
  ganache: null,
  testnet: null,
  mainnet: null,
}

export default function web3Reducer(state = initialState, action) {
  switch (action.type) {
    case WEB3_INITIALIZED:
      return Object.assign({}, state, {
        ganache: action.payload.ganache,
        testnet: action.payload.testnet,
        mainnet: action.payload.mainnet,
      })
    default:
      return state;
  }
}
