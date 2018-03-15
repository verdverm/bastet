export const INITIALIZE_WEB3  = 'INITIALIZE_WEB3'
export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'

import Web3 from 'web3';

export function initializeWeb3(results) {
    var ganacheP = new Web3.providers.HttpProvider('http://127.0.0.1:4545')
    // var testnetP = new Web3.providers.HttpProvider('http://127.0.0.1:9545')
    // var mainnetP = new Web3.providers.HttpProvider('http://127.0.0.1:10545')

    var ganache = new Web3(ganacheP);
    // var testnet = new Web3(testnetP);
    // var mainnet = new Web3(mainnetP);

    results = {
      ganache,
      // testnet,
      // mainnet
    }

    console.log("Web3 backends:", store)
    store.dispatch(web3Initialized(results))
}

export function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

