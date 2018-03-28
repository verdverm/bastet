import uuid from 'uuid';
import Web3 from 'web3';

import store from '../store';

var networks = null;
var defaultNetwork = null;

export function getDefaultWeb3() {
  if (defaultNetwork !== null) {
    return defaultNetwork.web3;
  } else {
    return null;
  }
}

export function getDefaultNetwork() {
  if (networks === null) {
    loadNetworks();
  }
  var ret = {};
  Object.entries(networks).forEach( ([id, net]) => {
    if (net.default === true) {
      ret = net
    }
  });

  return ret
}

export function getNetworks() {
  if (networks === null) {
    loadNetworks();
  }
  var ret = {};
  Object.entries(networks).forEach( ([id, net]) => {
    if (net.name === 'undefined') {
      return
    }
    var n = Object.assign({}, net)
    delete n.web3
    ret[id] = n
  });

  return ret
}

export function getNetwork(id) {
  if (networks === null) {
    loadNetworks();
  }
  var n = Object.assign({}, networks[id])
  delete n.web3
  return n;
}

export function getNetworkWithWeb3(id) {
  if (networks === null) {
    loadNetworks();
  }
  return networks[id];
}

export function setDefaultNetwork(id) {
  if (networks === null) {
    loadNetworks();
  }
  Object.entries(networks).forEach( ([netId, net]) => {
    if (netId === id) {
      defaultNetwork = net;
      net.default = true;
    } else {
      net.default = false;
    }
  });

  saveNetworks();
  return getNetworks();
}

export function addNetwork(name, location) {
  var type = determineNetworkConnectionType(location)
  const id = uuid();
  const net = {
    id,
    name,
    type,
    location,
    connected: false,
    default: false,
    web3: null,
  }
  networks[id] = net;
  saveNetworks();
  return getNetworks();
}

export function connectNetwork(id) {
  console.log("Conn - " + id)
  var net = networks[id];

  if (net !== undefined) {
    createWeb3(net)
    net.connected = true
    saveNetworks();
  }

  return getNetworks();
}

export function disconnectNetwork(id) {
  console.log("Disconn - " + id)
  var net = networks[id];

  if (net !== undefined) {
    networks[id].connected = false
  }

  saveNetworks();
  return getNetworks();
}

export function updateNetwork(net) {
  net.type = determineNetworkConnectionType(net.location)
  var curr = networks[net.id]
  networks[curr.id] = Object.assign(curr, net);
  saveNetworks();
  return getNetworks();
}

export function deleteNetwork(id) {
  delete networks[id];
  saveNetworks();
  return getNetworks();
}

export function saveNetworks() {
  var nets = getNetworks();
  store.set('networks', nets);
}

export function loadNetworks() {
  var nets = store.get('networks');
  if (nets !== null && nets !== undefined) {
    delete nets['undefined']
    networks = nets;
  } else {
    console.log("WARN: unable to load networks config, setting to defaults and saving")
    networks = defaultNetworks();
    saveNetworks();
  }

  Object.entries(networks).forEach( ([id, net]) => {
    var localNet = net
    if (net.type === undefined) {
      net.type = determineNetworkConnectionType(net.location)
    }
    if(localNet.connected) {
      createWeb3(localNet)
    }
  });

}

export function resetNetworks() {
  networks = defaultNetworks();
  saveNetworks();
  return getNetworks();
}

export function defaultNetworks() {
  return {
    infuraMainnet: {
      id: 'infuraMainnet',
      name: 'Infura Mainnet',
      type: 'https',
      location: 'https://mainnet.infura.io/',
      connected: false,
      web3: null,
    },
    infuraRinkeby: {
      id: 'infuraRinkeby',
      name: 'Infura Rinkeby',
      type: 'https',
      location: 'https://rinkeby.infura.io/',
      connected: false,
      web3: null,
    },
    localMainnet: {
      id: 'localMainnet',
      name: 'Local Mainnet',
      type: 'http',
      location: 'http://localhost:10545/',
      connected: false,
      web3: null,
    },
    localRinkeby: {
      id: 'localRinkeby',
      name: 'Local Rinkeby',
      type: 'http',
      location: 'http://localhost:9545/',
      connected: false,
      web3: null,
    },
    localGanache: {
      id: 'localGanache',
      name: 'Local Ganache',
      type: 'http',
      location: 'http://localhost:8545/',
      connected: true,
      default: true,
      web3: null,
    },
  }
}

function determineNetworkConnectionType(location) {
  if (location.substr(0,5) === 'https') {
    return 'https'
  }
  if (location.substr(0,4) === 'http') {
    return 'http'
  }
  if (location.substr(0,3) === 'wss') {
    return 'wss'
  }
  if (location.substr(0,2) === 'ws') {
    return 'ws'
  }
  return 'ipc'
}

function createWeb3(network) {
  if (network.type === 'http' || network.type === 'https') {
    var provider = new Web3.providers.HttpProvider(network.location)
    network.web3 = new Web3(provider);
    return
  }

  if (network.type === 'ws' || network.type === 'wss') {
    var provider = new Web3.providers.WsProvider(network.location)
    network.web3 = new Web3(provider);
    return
  }

  if (network.type === 'ipc') {
    var provider = new Web3.providers.IpcProvider(network.location)
    network.web3 = new Web3(provider);
    return
  }


}

