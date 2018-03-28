import WebSocket from 'ws';
import { createServer } from 'http';
import app from './http'

// lets only serve the Web3 API here
import rpc from '../rpc/web3';
import proxy from '../rpc/proxy';

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
	console.log("Websocket Connection", ws, req)

  var response = setupNewWssConn(ws);

  ws.send(JSON.stringify(response));
});

function setupNewWssConn(ws) {

  // Check origin (DApp)

  ws.on('message', (message) => {
    console.log('received: %s', message);
    var response = {
      hello: 'apple'
    }
    ws.send(JSON.stringify(response));
  });


  return 'ok'

}

// export the root http server
export default server;
