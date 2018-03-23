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

