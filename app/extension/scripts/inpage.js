

try {
  const Web3 = require('web3')


  var provider = null;
  var useHttp = false;
  if (useHttp) {
    console.log("Injecting Bastet Extension - HTTP")
    provider = new Web3.providers.HttpProvider('http://localhost:4545')
  } else {
    console.log("Injecting Bastet Extension - WS")
    provider = new Web3.providers.WebsocketProvider('ws://localhost:4545')
    provider.connection.onopen = function () {
      console.log('Bastet Connected :]')
    }
    provider.connection.onclose = function () {
      console.log('Bastet Connection Lost :[')
    }
  }

  provider.sendAsync = provider.send;
  var bastetWeb3 = new Web3(provider)
  window.web3 = bastetWeb3;

  console.log("Bastet Web3", bastetWeb3);
  console.log("Window Web3", window.web3);

} catch (e) {
  console.error('Bastet Error:', e)
}

