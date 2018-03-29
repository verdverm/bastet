import store from '../../store';

var dapps = null;

const dappDefault = {
  blocked: true,
  networks: {},
  methods: {},
};

/*
 *  dappConfig: {
 *    origin: "...",
 *    blocked: bool,
 *    networks?: {...},
 *    methods?: {...},
 *  }
 */

function enrich(dappConfig) {
  var ret = {};
  ret = Object.assign(ret, dappDefault);
  ret = Object.assign(ret, dappConfig);
  return ret;
}

export function getDapps() {
  if (dapps === null) {
    loadDapps();
  }
  return dapps;
}

export function getDappById(dappId) {
  if (dapps === null) {
    loadDapps();
  }
  var dapp = null;

  Object.entries(dapps).map(([id, d]) => {
    console.log("getDappById", dappId, id, d)
    if(d.id === dappId) {
      dapp = d;
    }
  })
  return dapp;
}

export function getDappByOrigin(origin) {
  if (dapps === null) {
    loadDapps();
  }
  return dapps[origin];
}

export function addDapp(dappConfig) {
  var d = enrich(dappConfig);

  dapps[d.origin] = d;

  saveDapps();
  return getDapps();

}

export function updateDapp(dappConfig) {
  var curr = getDappByOrigin(dappConfig.origin);
  if (curr === undefined) {
    return 'unknown dapp: ' + dappConfig.origin;
  }

  var d = Object.assign(curr, dappConfig);

  dapps[d.origin] = d;

  saveDapps();
  return getDapps();

}

export function blockDapp(dappId) {
  if (dapps === null) {
    loadDapps();
  }

  var dapp = getDappById(dappId);
  console.log("blocking", dapp)

  if (dapp) {
    dapp.blocked = true;
  }

  saveDapps();
  return getDapps();
}

export function unblockDapp(dappId) {
  if (dapps === null) {
    loadDapps();
  }

  var dapp = getDappById(dappId);
  console.log("unblocking", dapp)

  if (dapp) {
    dapp.blocked = false;
  }

  saveDapps();
  return getDapps();
}

export function saveDapps() {
  store.set('dapps', dapps);
}

export function loadDapps() {
  var ds = store.get('dapps');
  if (ds !== null && ds !== undefined) {
    delete ds['undefined']
    dapps = ds;
  } else {
    // default
    dapps = {};
  }
}

