import * as Admin from '../../rpc/admin';

export function addListeners(ipcBus) {
  // Channel for Bastet UI application specifics and intentions (admin part of Bastet UI)
  ipcBus.addListener('app', (ipcBusEvent, payload) => {
    console.log("IPC-APP: ", ipcBusEvent, payload)

  });

  ipcBus.addListener('app/getNetworks', (ipcBusEvent, payload) => {
    console.log("getNetworks")
    var networks = Admin.getNetworks();
    ipcBus.send('app/networks', networks);
  });

  ipcBus.addListener('app/connectNetwork', (ipcBusEvent, payload) => {
    console.log("connectNetwork", payload)
    var networks = Admin.connectNetwork(payload);
    ipcBus.send('app/networks', networks);
  });

  ipcBus.addListener('app/disconnectNetwork', (ipcBusEvent, payload) => {
    var networks = Admin.disconnectNetwork(payload);
    ipcBus.send('app/networks', networks);
  });
}

export function removeListeners(ipcBus) {
}
