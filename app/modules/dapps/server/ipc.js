import * as RPC from './rpc';

export function addListeners(ipcBus) {

  ipcBus.addListener('app/getDapps', (ipcBusEvent, payload) => {
    var dapps = RPC.getDapps();
    ipcBus.send('app/dapps', dapps);
  });

  ipcBus.addListener('app/blockDapp', (ipcBusEvent, payload) => {
    var dapps = RPC.blockDapp(payload.dappId);
    ipcBus.send('app/dapps', dapps);
  });

  ipcBus.addListener('app/unblockDapp', (ipcBusEvent, payload) => {
    var dapps = RPC.unblockDapp(payload.dappId);
    ipcBus.send('app/dapps', dapps);
  });

}

export function removeListeners(ipcBus) {
}
