export * from '../networks/actions';

export const ACCOUNTS_LOADED = 'ACCOUNTS_LOADED';

export function accountsLoaded(results) {
  return {
    type: ACCOUNTS_LOADED,
    payload: results
  }
}

export function listenAccounts(ipcBus) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.addListener('app/accounts', (ipcBusEvent, accounts) => {
      dispatch(networksLoaded(accounts));
    })
  };
}

export function unlistenAccounts(ipcBus) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.removeListener('app/accounts')
  };
}

export function getAccounts(ipcBus, network) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/getNetworkAccounts', network)
  };
}

