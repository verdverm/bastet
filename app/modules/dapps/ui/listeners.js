export const DAPPS_LOADED = 'DAPPS_LOADED';

export function dappsLoaded(dapps) {
  return {
    type: DAPPS_LOADED,
    payload: dapps
  };
}

export function listenDapps(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    ipcBus.addListener('app/dapps', (ipcBusEvent, dapps) => {
      dispatch(dappsLoaded(dapps));
    })
  };
}

export function unlistenDapps(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    ipcBus.removeListener('app/dapps')
  };
}


