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


