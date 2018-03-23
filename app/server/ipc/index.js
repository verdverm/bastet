import * as App from './app';
import * as Ui  from './ui';
import * as Rpc from './rpc';

export function addListeners(ipcBus) {
  App.addListeners(ipcBus)
  Ui.addListeners(ipcBus)
  Rpc.addListeners(ipcBus)
}

export function removeListeners(ipcBus) {
  App.removeListeners(ipcBus)
  Ui.removeListeners(ipcBus)
  Rpc.removeListeners(ipcBus)
}
