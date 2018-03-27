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

export function listenNetworks(ipcBus) {
  console.log("Getting networks", ipcBus)
  return (dispatch: (action: actionType) => void, getState: () => null) => {

    ipcBus.addListener('app/networks', (ipcBusEvent, networks) => {
      console.log("Received networks", networks)
      dispatch(networksLoaded(networks));
    })

  };
}

export function unlistenNetworks(ipcBus) {
  console.log("Unlistening networks", ipcBus)
  return (dispatch: (action: actionType) => void, getState: () => null) => {

    ipcBus.removeListener('app/networks')

  };
}


export function getNetworks(ipcBus) {
  console.log("Getting networks", ipcBus)
  return (dispatch: (action: actionType) => void, getState: () => null) => {

    console.log("Sending getNetworks", ipcBus, window.ipcBus)
    ipcBus.send('app/getNetworks', null)

  };
}

export function connectNetwork(ipcBus, id) {
  console.log("Connecting network", id)
  return (dispatch: (action: actionType) => void, getState: () => null) => {

    console.log("sending Connect network", id)
    ipcBus.send('app/connectNetwork', id)

  };
}

export function disconnectNetwork(ipcBus, id) {
  console.log("Disconnecting network", id)
  return (dispatch: (action: actionType) => void, getState: () => null) => {

    console.log("sending Disconnect network", id)
    ipcBus.send('app/disconnectNetwork', id)

  };
}

export function addNetwork(ipcBus, network) {
  console.log("Add network", network)
  return (dispatch: (action: actionType) => void, getState: () => null) => {

    console.log("sending Add network", network)
    ipcBus.send('app/addNetwork', network)

  };
}

export function updateNetwork(ipcBus, network) {
  console.log("Network network", network)
  return (dispatch: (action: actionType) => void, getState: () => null) => {

    console.log("sending Update network", network)
    ipcBus.send('app/updateNetwork', network)

  };
}

export function deleteNetwork(ipcBus, id) {
  console.log("Deleting network", id)
  return (dispatch: (action: actionType) => void, getState: () => null) => {

    console.log("sending Delete network", id)
    ipcBus.send('app/deleteNetwork', id)

  };
}

export function setDefaultNetwork(ipcBus, id) {
  console.log("Defaulting network", id)
  return (dispatch: (action: actionType) => void, getState: () => null) => {

    console.log("sending Default network", id)
    ipcBus.send('app/setDefaultNetwork', id)

  };
}

