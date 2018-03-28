export const NETWORKS_LOADED = 'NETWORKS_LOADED';

export function networksLoaded(networks) {
  return {
    type: NETWORKS_LOADED,
    payload: networks
  };
}

export function listenNetworks(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    console.log("NETWORKS !!!", 'listening')
    ipcBus.addListener('app/networks', (ipcBusEvent, networks) => {
      console.log("NETWORKS !!!", networks)
      dispatch(networksLoaded(networks));
    })
  };
}

export function unlistenNetworks(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    ipcBus.removeListener('app/networks')
  };
}

export const ACCOUNTS_LOADED = 'ACCOUNTS_LOADED';

export function accountsLoaded(results) {
  return {
    type: ACCOUNTS_LOADED,
    payload: results
  }
}

export function listenAccounts(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    console.log("ACCOUNTS !!!", 'listening')
    ipcBus.addListener('app/accounts', (ipcBusEvent, accounts) => {
      console.log("ACCOUNTS !!!", accounts)
      dispatch(accountsLoaded(accounts));
    })
  };
}

export function unlistenAccounts(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    ipcBus.removeListener('app/accounts')
  };
}

