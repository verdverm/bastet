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

    var rpcReq = JSON.parse(message);
    const dapp = getDappByOrigin(origin);

    // TODO Lookup Dapp Network(s)
    const net = getDefaultNetwork();

    var rpcResult = handleRPC(dapp, net, rpcReq, (err, result) => {
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
