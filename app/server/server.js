const jayson = require('jayson');
const cors = require('cors');
const jsonParser = require('body-parser').json;

const express = require('express');
const rpcFuncs = require('../rpc');

console.log("RPC Funcs:", rpcFuncs)

// create a server
var server = jayson.server(rpcFuncs,{
  router: function(method, params) {

    // regular by-name routing first
    if(this._methods[method] !== undefined) return this._methods[method];

    // DEV TODO temp proxy for undefinded methods
		return jayson.client.http({
			port: 8545
		})

		// var fn = server.getMethod('add').getHandler();
		return new jayson.Method(function(args, done) {
			args.unshift(2);
			fn(args, done);
		});
  }
});


// create wrapper app
var app = express();
var expressWs = require('express-ws')(app);

app.use(cors({
  origin: '*',
  methods: ['GET','HEAD','PUT','PATCH', 'POST', 'DELETE', 'OPTIONS'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use(jsonParser());
app.use(server.middleware());

app.ws('/', function(ws, req) {
  console.log("WebSocket!!", req)
  ws.on('message', function(msg) {
    console.log("WebSocket Message:", msg);
  });
  console.log('socket', req.testing);
});


export default app;

