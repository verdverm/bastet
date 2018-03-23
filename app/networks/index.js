import uuid from 'uuid';

import store from '../store';

var networks = null;


export function getNetworks() {
  resetNetworks();
  if (networks === null) {
    loadNetworks();
  }
  var ret = {};
  Object.entries(networks).forEach( ([id, net]) => {
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
  return networks[id];
}

export function addNetwork(name, type, location) {
  const id = uuid();
  const net = {
    id,
    name,
    type,
    location,
    connected: false,
    web3: null,
  }
  networks[id] = net;
}

export function connectNetwork(id) {
  console.log("Conn - " + id)
  var net = networks[id];

  if (net !== undefined) {
    networks[id].connected = true
  }

  return networks;
}

export function disconnectNetwork(id) {
  console.log("Disconn - " + id)
  var net = networks[id];

  if (net !== undefined) {
    networks[id].connected = false
  }

  return networks;
}

export function delNetwork(id) {
  delete networks[id];
}

export function saveNetworks() {
  store.set('networks', networks);
}

export function loadNetworks() {
  var nets = store.get('networks');
  if (nets !== null && nets !== undefined) {
    networks = nets;
  } else {
    console.log("WARN: unable to load networks config, setting to defaults and saving")
    networks = defaultNetworks();
    saveNetworks();
  }
}

export function resetNetworks() {
  networks = defaultNetworks();
  saveNetworks();
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
      connected: false,
      web3: null,
    },
  }
}
