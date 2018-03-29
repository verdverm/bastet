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


