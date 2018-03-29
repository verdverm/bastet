import * as RPC from './rpc';

export function addListeners(ipcBus) {

  ipcBus.addListener('app/getDapps', (ipcBusEvent, payload) => {
    var dapps = RPC.getDapps();
    console.log("returning dapps:", dapps)
    ipcBus.send('app/dapps', dapps);
  });

}

export function removeListeners(ipcBus) {
}
