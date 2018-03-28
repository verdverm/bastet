export * from '../networks/actions';

export const ACCOUNTS_LOADED = 'ACCOUNTS_LOADED';

export function accountsLoaded(results) {
  return {
    type: ACCOUNTS_LOADED,
    payload: results
  }
}


export function getAccounts(ipcBus, netId) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    // ipcBus.send('app/getAccounts', netId)

    ipcBus.request(100, 'app/getAccounts', {netId})
  };
}

export function unlockAccount(ipcBus, netId, acctId) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/unlockAccount', { netId: netId, acctId })
  };
}

export function lockAccount(ipcBus, netId, acctId) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/lockAccount', { netId, acctId })
  };
}

export function addAccount(ipcBus, netId, account) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/addAccount', {netId, account})
  };
}

export function updateAccount(ipcBus, netId, account) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/updateAccount', {netId, account})
  };
}

export function deleteAccount(ipcBus, netId, acctId) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/deleteAccount', { netId, acctId })
  };
}

export function setDefaultAccount(ipcBus, netId, acctId) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/setDefaultAccount', { netId, acctId })
  };
}

