const jayson = require('jayson');
const cors = require('cors');
const connect = require('connect');
const jsonParser = require('body-parser').json;

const rpcFuncs = require('./funcs');

// create a server
var server = jayson.server(rpcFuncs,{
  router: function(method, params) {

		console.log("Jayson - router: ", method, params)

    // regular by-name routing first
    if(this._methods[method] !== undefined) return this._methods[method];

    console.log(this._methods)
    console.log(typeof(this._methods[method]))
    console.log(this._methods[method])

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
var app = connect();

app.use(cors({
  origin: '*',
  methods: ['GET','HEAD','PUT','PATCH', 'POST', 'DELETE', 'OPTIONS'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use(jsonParser());
app.use(server.middleware());

// Export some basic functions
export default {
  Start: async () => {
    console.log("Starting Server")
		// engine.start();
		return app.listen(4545);
  },
  Stop: () => {
    console.log("Stopping Server")
  }
}
