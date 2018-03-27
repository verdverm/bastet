export const NETWORKS_LOADED = 'NETWORKS_LOADED';

export function networksLoaded(networks) {
  return {
    type: NETWORKS_LOADED,
    payload: networks
  };
}

export function listenNetworks(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    ipcBus.addListener('app/networks', (ipcBusEvent, networks) => {
      dispatch(networksLoaded(networks));
    })
  };
}

export function unlistenNetworks(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    ipcBus.removeListener('app/networks')
  };
}

export function listenAccounts(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    ipcBus.addListener('app/accounts', (ipcBusEvent, accounts) => {
      dispatch(networksLoaded(accounts));
    })
  };
}

export function unlistenAccounts(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    ipcBus.removeListener('app/accounts')
  };
}

