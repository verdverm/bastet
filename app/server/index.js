const createMainWindow = require('../mainwin');
const Web3 = require('web3')
const jayson = require('jayson');

// backend (proxied) providers
var ganacheP = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
var ganache = new Web3(ganacheP);
/*
var testnetP = new Web3.providers.HttpProvider('http://127.0.0.1:9545')
var testnet = new Web3(testnetP);
var mainnetP = new Web3.providers.HttpProvider('http://127.0.0.1:10545')
var mainnet = new Web3(mainnetP);
*/

// create a server
var server = jayson.server({
  reopen: function(args, callback) {
    // callback(null, args[0] + args[1]);
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
  eth_accounts: async function(args, callback) {
    var accounts = null;

    return ganache.eth.getAccounts(function(err, accs) {
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

      console.log("eth_accounts:", accounts);
      callback(null, accounts);
    });

  }
});


export default {
  Start: async () => {
    console.log("Starting Server")
		// engine.start();
		return server.http().listen(4545);
  },
  Stop: () => {
    console.log("Stopping Server")
  }
}
