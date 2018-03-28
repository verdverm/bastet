import * as Nets from '../../rpc/networks';

export function addListeners(ipcBus) {

  ipcBus.addListener('app/getNetworks', (ipcBusEvent, payload) => {
    var networks = Nets.getNetworks();
    ipcBus.send('app/networks', networks);
  });

  ipcBus.addListener('app/getNetwork', (ipcBusEvent, payload) => {
    var network = Nets.getNetwork(payload.netId);
    ipcBus.send('app/network', network);
  });

  ipcBus.addListener('app/connectNetwork', (ipcBusEvent, payload) => {
    var networks = Nets.connectNetwork(payload.netId);
    ipcBus.send('app/networks', networks);
  });

  ipcBus.addListener('app/disconnectNetwork', (ipcBusEvent, payload) => {
    var networks = Nets.disconnectNetwork(payload.netId);
    ipcBus.send('app/networks', networks);
  });

  ipcBus.addListener('app/addNetwork', (ipcBusEvent, payload) => {
    var networks = Nets.addNetwork(payload.name, payload.location);
    ipcBus.send('app/networks', networks);
  });

  ipcBus.addListener('app/updateNetwork', (ipcBusEvent, payload) => {
    var networks = Nets.updateNetwork(payload);
    ipcBus.send('app/networks', networks);
  });

  ipcBus.addListener('app/deleteNetwork', (ipcBusEvent, payload) => {
    var networks = Nets.deleteNetwork(payload.netId);
    ipcBus.send('app/networks', networks);
  });

  ipcBus.addListener('app/setDefaultNetwork', (ipcBusEvent, payload) => {
    var networks = Nets.setDefaultNetwork(payload.netId);
    ipcBus.send('app/networks', networks);
  });

}

export function removeListeners(ipcBus) {
}
