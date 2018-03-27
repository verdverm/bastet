import * as Admin from '../../rpc/admin';

export function addListeners(ipcBus) {

  ipcBus.addListener('app/getNetworks', (ipcBusEvent, payload) => {
    var networks = Admin.getNetworks();
    ipcBus.send('app/networks', networks);
  });

  ipcBus.addListener('app/connectNetwork', (ipcBusEvent, payload) => {
    var networks = Admin.connectNetwork(payload);
    ipcBus.send('app/networks', networks);
  });

  ipcBus.addListener('app/disconnectNetwork', (ipcBusEvent, payload) => {
    var networks = Admin.disconnectNetwork(payload);
    ipcBus.send('app/networks', networks);
  });

  ipcBus.addListener('app/addNetwork', (ipcBusEvent, payload) => {
    var networks = Admin.addNetwork(payload.name, payload.location);
    ipcBus.send('app/networks', networks);
  });

  ipcBus.addListener('app/updateNetwork', (ipcBusEvent, payload) => {
    var networks = Admin.updateNetwork(payload);
    ipcBus.send('app/networks', networks);
  });

  ipcBus.addListener('app/deleteNetwork', (ipcBusEvent, payload) => {
    var networks = Admin.deleteNetwork(payload);
    ipcBus.send('app/networks', networks);
  });

  ipcBus.addListener('app/setDefaultNetwork', (ipcBusEvent, payload) => {
    var networks = Admin.setDefaultNetwork(payload);
    ipcBus.send('app/networks', networks);
  });

}

export function removeListeners(ipcBus) {
}
