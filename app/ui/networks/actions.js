// @flow
export type actionType = {
  +type: string
};

export const NETWORKS_LOADED = 'NETWORKS_LOADED';

export function networksLoaded(networks) {
  return {
    type: NETWORKS_LOADED,
    payload: networks
  };
}

export function getNetworks(ipcBus) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/getNetworks', null)
  };
}

export function connectNetwork(ipcBus, id) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/connectNetwork', id)
  };
}

export function disconnectNetwork(ipcBus, id) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/disconnectNetwork', id)
  };
}

export function addNetwork(ipcBus, network) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/addNetwork', network)
  };
}

export function updateNetwork(ipcBus, network) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/updateNetwork', network)
  };
}

export function deleteNetwork(ipcBus, id) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/deleteNetwork', id)
  };
}

export function setDefaultNetwork(ipcBus, id) {
  return (dispatch: (action: actionType) => void, getState: () => null) => {
    ipcBus.send('app/setDefaultNetwork', id)
  };
}

