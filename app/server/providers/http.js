import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { getDefaultNetwork } from '../../modules/networks/server/lib';
import { getDappByOrigin } from '../../modules/dapps/server/lib';

import {
  extractConnInfo, checkConn,
  checkRPC, handleRPC
} from './common';

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
  var connInfo = extractConnInfo(req);
  console.log("RPC - HTPP CONN -", connInfo)

  var fail = checkConn(connInfo);
  if (fail !== null) {
    var ret = {
      jsonrpc: '2.0',
      id: 0,
      error: fail,
    }
    return res.json(ret);
  }


  var rpcReq = req.body;
  const dapp = getDappByOrigin(connInfo.origin);

  // TODO Lookup Dapp Network(s)
  const net = getDefaultNetwork();

  handleRPC(dapp, net, rpcReq, (err, result) => {
    var ret = Object.assign(rpcReq, {
      result,
      error: err,
    });
    console.log("RPC - HTTP ret -", ret)
    return res.json(ret);
  })

})

export default app;
