const initialState = {
  ganache: null,
  testnet: null,
  mainnet: null,
}

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED')
  {
    return Object.assign({}, state, {
      ganache: action.payload.ganache,
      testnet: action.payload.testnet,
      mainnet: action.payload.mainnet,
    })
  }

  return state
}

export default web3Reducer
