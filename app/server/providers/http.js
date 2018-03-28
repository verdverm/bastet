import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// lets only serve the Web3 API here
import rpc from '../rpc/web3';
import proxy from '../rpc/proxy';

import { getDefaultNetwork } from '../../modules/networks/server/lib';

// An express server which will be wrapped by wss
var app = express();

// Some middleware
app.use(cors({
  origin: '*',
  methods: ['GET','HEAD','PUT','PATCH', 'POST', 'DELETE', 'OPTIONS'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use(bodyParser.json());


// The handlers
app.get('/', function(req, res) {
  console.log("HTTP GET", req)
  return res.json({
    hello: "apple"
  })
})

app.post('/', function(req, res) {
  const rpcReq = req.body;
  console.log("RPC - HTTP ", rpcReq)


  // Check Dapp

  // Lookup Dapp Network(s)
  const net = getDefaultNetwork();
  console.log("  using network: ", net.name, net.id, net.location)

  // One of our intercepted methods?
  const method = rpc[rpcReq.method]
  if (method) {
    console.log('RPC - HTTP - found overridden method')
    console.log("  method: ", method)
    method(net.web3, rpcReq.params, (err, result) => {
      console.log("RPC - HTTP - returning", err, result)
      if (err !== null) {
        return res.json({
          jsonrpc: '2.0',
          id: rpcReq.id,
          result: null,
          error: err,
        })
      }
      return res.json({
          jsonrpc: '2.0',
          id: rpcReq.id,
          result,
          error: null,
        })
    })

  } else {
    // otherwise, proxy through to the network
    console.log('RPC - HTTP - passing along to default network')

    proxy(net.web3, rpcReq.method, rpcReq.params, (err, result) => {
      console.log("RPC - HTTP - returning", err, result)
      if (err !== null) {
        return res.json({
          jsonrpc: '2.0',
          id: rpcReq.id,
          result: null,
          error: err,
        })
      }
      return res.json({
          jsonrpc: '2.0',
          id: rpcReq.id,
          result,
          error: null,
        })
    })

  }

})

export default app;
