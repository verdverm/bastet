import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import intercept from '../rpc/web3-intercept';
import proxy from '../rpc/web3-proxy';

import { getDefaultNetwork } from '../../modules/networks/server/lib';
import { checkDapp } from './permit';
import { checkOrigin } from './permit/origin';

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
app.post('/', function(req, res) {
  // pull some information out of the request;
  const origin = req.get('origin');
  const host = req.get('host');
  const ip = req.ip;
  const userIP = req.socket.remoteAddress;
  const userIP2 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const rpcReq = req.body;
  console.log("RPC - HTTP ", origin, host, ip, userIP2, rpcReq)

  // Check Dapp
  // Verify Dappp
  var fail = checkOrigin(origin);
  if (fail !== null) {
    return fail;
  }

  // TODO Lookup Dapp Network(s)
  const net = getDefaultNetwork();
  console.log("  using network: ", net.name, net.id, net.location)

  var fail = checkDapp(origin, net, rpcReq);
  if (fail !== null) {
    return res.json({
      jsonrpc: '2.0',
      id: rpcReq.id,
      result: null,
      error: fail,
    })
  }

  // One of our intercepted methods?
  const method = intercept[rpcReq.method]
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
