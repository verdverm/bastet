import WebSocket from 'ws';
import { createServer } from 'http';
import app from './http'

import { getDefaultNetwork } from '../../modules/networks/server/lib';
import { getDappByOrigin } from '../../modules/dapps/server/lib';

import {
  extractConnInfo, checkConn,
  checkRPC, handleRPC
} from './common';

// A HTTP server server
var server = createServer();
// handle regular requests with express
server.on('request', app)

// A Websocket server
var wss = new WebSocket.Server({
  server,
});

// handle a websocket connection request
wss.on('connection', (ws, req) => {
  var connInfo = extractConnInfo(req);
  console.log("RPC - WS CONN -", connInfo)

  var fail = checkConn(connInfo);
  if (fail !== null) {
    var ret = {
      jsonrpc: '2.0',
      id: 0,
    method: '',
      error: fail,
    }
    ws.send(JSON.stringify(ret));
    return;
  }

  setupWebsocketHandlers(ws, connInfo.origin);

  var ret = {
    jsonrpc: '2.0',
    id: 0,
    result: 'ok',
    method: '',
    error: null,
  }

  ws.send(JSON.stringify(ret));
});

function setupWebsocketHandlers(ws, origin) {


  ws.on('message', (message) => {

    console.log("ws message from", origin)
    var rpcReq = JSON.parse(message);
    var dapp = getDappByOrigin(origin);

    // TODO Lookup Dapp Network(s)
    const net = getDefaultNetwork();

    var fail = checkRPC(dapp, net, rpcReq)
    if (fail !== null) {
      var ret = Object.assign(rpcReq, {
        error: fail,
      });
      console.log("RPC - WS Err ret -", ret)
      ws.send(JSON.stringify(ret));
      return
    }

    handleRPC(dapp, net, rpcReq, (err, result) => {
      console.log("ws response to", origin, result, err)
      var ret = Object.assign(rpcReq, {
        result,
        error: err,
      });
      console.log("RPC - WS ret -", ret)
      ws.send(JSON.stringify(ret));
    })

  });

}

// export the root http server
export default server;
