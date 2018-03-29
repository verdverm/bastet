// @flow
export type actionType = {
  +type: string
};

export const DAPPS_LOADED = 'DAPPS_LOADED';

export function dappsLoaded(dapps) {
  return {
    type: DAPPS_LOADED,
    payload: dapps
  };
}

export function getDapps(ipcBus) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/getDapps', null)
  };
}

export function unblockDapp(ipcBus, dappId) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/unblockDapp', { dappId })
  };
}

export function blockDapp(ipcBus, dappId) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/blockDapp', { dappId })
  };
}


