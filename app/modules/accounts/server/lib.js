import { getNetworkWithWeb3 } from '../../networks/server/lib';
import store from '../../store';

var accounts = null; // keyed by network

export async function refreshAccounts(netId) {
  const network = getNetworkWithWeb3(netId);

  if (network === undefined) {
    return {
      error: "unknkown network with id: " + netId
    }
  }
  if (network.connected === false) {
    return {
      error: "network with id: " + netId + " is not connected. Please connect first."
    }
  }

  const web3 = network.web3;

  var accts = await web3.eth.getAccounts();

  const promises = accts.map((acct) => {
    const localAcct = acct;
    return enrich(web3, localAcct)
  })

  var accts = [];
  await Promise.all(promises).then((values) => {
    accts = values;
  })

  accounts[netId] = accts;
  saveAccounts();
  return getAccounts(netId);

}

export function getAccounts(netId) {
  console.log("Getting accounts for", netId)
  if (accounts === null) {
    loadAccounts();
  }

  if (netId === undefined) {
    return accounts;
  }

  var net = accounts[netId];
  if (net === undefined) {
    console.log("Refreshing accounts for", netId)
    return refreshAccounts(netId)
  }

  // make a copy / filter
  var copy = {};
  Object.entries(net).forEach( ([id, acct]) => {
    var a = Object.assign({}, acct)
    // anything to delete or add?
    copy[id] = a
  });

  var ret = {};
  ret[netId] = copy;
  return ret
}

export function getAccount(netId, acctId) {
  if (accounts === null) {
    loadAccounts();
  }
  var net = accounts[netId];
  if (net === undefined) {
    return null;
  }
  var acct = Object.assign({}, net[acctId])
  // anything to delete or add?
  return acct;
}

export function getAccountWithWeb3(netId, acctId) {
  if (accounts === null) {
    loadAccounts();
  }
  return accounts[id];
}

export function getDefaultAccount(netId) {
  if (accounts === null) {
    loadAccounts();
  }
  var ret = {};
  Object.entries(networks).forEach( ([id, net]) => {
    if (net.default === true) {
      ret = net
    }
  });

  return ret
}

export function setDefaultAccount(netId, acctId) {
  if (accounts === null) {
    loadAccounts();
  }
  Object.entries(accounts).forEach( ([netId, net]) => {
    if (netId === id) {
      defaultAccount = net;
      net.default = true;
    } else {
      net.default = false;
    }
  });

  saveAccounts();
  return getAccounts();
}

export function addAccount(config) {
  const id = uuid();
  config.id = id;
  enrich(config);
  accounts[id] = config;

  saveAccounts();
  return getAccounts();
}

export function updateAccount(net) {
  net.type = determineAccountConnectionType(net.location)
  var curr = accounts[net.id]
  accounts[curr.id] = Object.assign(curr, net);
  saveAccounts();
  return getAccounts();
}

export function deleteAllAccounts(netId) {
  delete accounts[netId];
  saveAccounts();
  return getAccounts();
}

export function deleteAccount(netId, acctId) {
  var accts = accounts[netId];
  if (accts) {
    delete accounts[netId][acctId]
  }
  saveAccounts();
  return getAccounts();
}

export function saveAccounts() {
  store.set('accounts', accounts);
}

export function loadAccounts() {
  var accts = store.get('accounts');
  if (accts !== null && accts !== undefined) {
    delete accts['undefined']
    accounts = accts;
  } else {
    // default
    accounts = {};
  }

  /*
  Object.entries(accounts).forEach( ([id, acct]) => {
    var localAcct = acct
    if (acct.type === undefined) {
      acct.type = determineAccountConnectionType(acct.location)
    }
    if(localAcct.connected) {
      createWeb3(localAcct)
    }
  });
  */

}

export function unlockAccount(netId, acctId) {
  var net = accounts[netId];

  if (net !== undefined) {
    console.log("Unlock - LIB", netId, acctId, net)
    var acct = net.filter(a => a.id === acctId)[0];
    doUnlockAccount(netId, acct)
    saveAccounts();
  }

  return getAccounts();
}

export function lockAccount(netId, acctId) {
  var net = accounts[netId];

  if (net !== undefined) {
    console.log("Locking", netId, acctId, net)
    var acct = net.filter(a => a.id === acctId)[0];
    doLockAccount(netId, acct)
    saveAccounts();
  }

  return getAccounts();
}

function doUnlockAccount(netId, acct) {
  console.log("Unlock - DO ", netId, acct)
  if (acct === undefined) {
    return
  }

  // unlock against it's network
  const network = getNetworkWithWeb3(netId);
  // ...

  // set unlocked state
  acct.unlocked = true;
}

function doLockAccount(netId, acct) {
  if (acct === undefined) {
    return
  }

  // lock against it's network
  const network = getNetworkWithWeb3(netId);
  // ...

  // set unlocked state
  acct.unlocked = false;
}

async function enrich (web3, acct) {
  return {
    id: acct,
    default: false,
    unlocked: false,
    key: null
  }
}

