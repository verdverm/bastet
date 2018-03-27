import EthereumTx from 'ethereumjs-tx';

import { getIpcClient } from '../proc/ipc';
import { sendRequest } from '../ui/ipc/send.js';

import { loadNetworks, getDefaultWeb3 } from '../networks';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// backend (proxied) providers
// var ganacheP = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
// var ganache = new Web3(ganacheP);
loadNetworks();
var network = getDefaultWeb3();

const keys = require('./keys')
console.log("Keys")


/*
var testnetP = new Web3.providers.HttpProvider('http://127.0.0.1:9545')
var testnet = new Web3(testnetP);
var mainnetP = new Web3.providers.HttpProvider('http://127.0.0.1:10545')
var mainnet = new Web3(mainnetP);
*/

// TODO, get version from package
const version = "Bastet:v0.0.1";

export default {
  net_version: (args, callback) => {
    console.log("version", version)
    callback(null, version);
  },
  eth_accounts: async function(args, callback) {
    console.log("eth accounts")
    var accounts = null;

    return network.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        callback(err, err)
        return
      }

      accounts = accs;

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        callback(null, [])
        return;
      }

      callback(null, accounts);
    });

  },
  eth_coinbase: (args, callback) => {
    network.eth.getCoinbase(function(err, result) {
      if (err != null) {
        console.log("There was an error fetching coinbase.");
        callback(err, err)
        return
      }

      callback(null, result);
    })
  },
  eth_sendTransaction: async (args, callback) => {
    const defaultParams = {
      gasPrice: '0x000000000003',
      gasLimit: '0x271000',
      to: '0x0000000000000000000000000000000000000000',
      value: '0x00',
      data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
      // EIP 155 chainId - mainnet: 1, ropsten: 3
      chainId: 22323
      //
    }

    try {

      const rawTx = args[0]
      const txParams = Object.assign(defaultParams, rawTx)

      let cnt = await network.eth.getTransactionCount(rawTx.from)
      const Nonce = '0x' + cnt.toString(16)
      txParams.nonce = Nonce

      // Pause for user input
      var waiting = true;
      let ipcBusClient = getIpcClient();
      ipcBusClient.send("app/signing-request", txParams);

      ipcBusClient.once("app/signing-approve", (approve) => {

        if (approve === false) {
          console.log("DENIED !!!")
          callback("denied", "denied")
          waiting = false;

        } else {
          console.log("APPROVAL !!!", txParams, keys)
          // TODO get key from encrpypted store
          const key = keys[txParams.from]
          console.log("Key:", key)
          const privateKey = Buffer.from(key, 'hex')

          // Create and sign the transaction
          const tx = new EthereumTx(txParams)
          console.log("TX:", tx)
          tx.sign(privateKey)
          const serializedTx = tx.serialize()

          console.log("sending signed transaction")
          network.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, result) => {
            console.log("send result", result, err)
            callback(err, result)
            waiting = false;
          })
        }

      });


      do {
        console.log("waiting for signing", waiting)
        await sleep(1000)
      } while (waiting)

    } catch( e ) {
      console.log("Caught Error - sendTransaction", args,  e)
    }
  }

}
