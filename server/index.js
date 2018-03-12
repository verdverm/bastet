const ProviderEngine = require('web3-provider-engine')
const ZeroClientProvider = require('web3-provider-engine/zero')
const createMainWindow = require('../app/mainwin');

var jayson = require('jayson');

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
  }
});


/*
// create engine
const engine = ZeroClientProvider({
  getAccounts: function(){},
  rpcUrl: 'http://127.0.0.1:10545/',
})

// log new blocks
engine.on('block', function(block){
  console.log('Mainnet - BLOCK CHANGED:', '#'+block.number.toString('hex'), '0x'+block.hash.toString('hex'))
})
*/

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
