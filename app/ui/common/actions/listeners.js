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

export const ACCOUNTS_LOADED = 'ACCOUNTS_LOADED';

export function accountsLoaded(results) {
  return {
    type: ACCOUNTS_LOADED,
    payload: results
  }
}

export function listenAccounts(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    ipcBus.addListener('app/accounts', (ipcBusEvent, accounts) => {
      dispatch(accountsLoaded(accounts));
    })
  };
}

export function unlistenAccounts(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    ipcBus.removeListener('app/accounts')
  };
}

export const PENDING_REQUEST = 'PENDING_REQUEST';

export function pendingRequest(results) {
  return {
    type: PENDING_REQUEST,
    payload: results
  }
}
export function listenNotifications(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    ipcBus.addListener('app/notifications', (ipcBusEvent, payload) => {
      dispatch(pendingRequest(payload));
    })
  };
}

export function unlistenNotifications(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    ipcBus.removeListener('app/notifications')
  };
}

