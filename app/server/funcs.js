const EthereumTx = require('ethereumjs-tx')
const Web3 = require('web3')
const jayson = require('jayson');

const createMainWindow = require('../ui/mainwin');

// backend (proxied) providers
var ganacheP = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
var ganache = new Web3(ganacheP);

const privateKey = Buffer.from('<private-key>', 'hex')

/*
var testnetP = new Web3.providers.HttpProvider('http://127.0.0.1:9545')
var testnet = new Web3(testnetP);
var mainnetP = new Web3.providers.HttpProvider('http://127.0.0.1:10545')
var mainnet = new Web3(mainnetP);
*/

// TODO, get version from package
const version = "Bastet:v0.0.1";
var network = ganache;

export default {
  reopen: function(args, callback) {
    console.log("reopen", args)
    createMainWindow().then(()=> {
      callback(null, "done")
    })
  },
  echo: function(msg, callback) {
    if(msg != null)
      callback(null, msg);
  },
  add: function(a, b, callback) {
    if( (a!= null) && (b!= null) )
      callback(null, a + b);
  },
  net_version: (args, callback) => {
    callback(null, version);
  },
  eth_accounts: async function(args, callback) {
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
    const rawTx = args[0]


    let cnt = await network.eth.getTransactionCount(rawTx.from)

    const Nonce = '0x' + cnt.toString(16)
    console.log("YAARRRGGS:", rawTx, Nonce, cnt);

    const defaultParams = {
      nonce: Nonce,
      gasPrice: '0x000000000003',
      gasLimit: '0x271000',
      to: '0x0000000000000000000000000000000000000000',
      value: '0x00',
      data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
      // EIP 155 chainId - mainnet: 1, ropsten: 3
      chainId: 22323
      //
    }

    const txParams = Object.assign(defaultParams, rawTx)
    console.log("TxParams:", txParams)

    const tx = new EthereumTx(txParams)
    tx.sign(privateKey)
    const serializedTx = tx.serialize()

    network.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, result) => {
      console.log("send result", result, err)
      callback(err, result)
    })
  }

}
