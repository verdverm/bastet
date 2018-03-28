import * as Ui  from './ui';
import * as Rpc from './rpc';

import * as Networks from './networks';
import * as Accounts from './accounts';

export function addListeners(ipcBus) {
  Ui.addListeners(ipcBus)
  Rpc.addListeners(ipcBus)

  Networks.addListeners(ipcBus)
  Accounts.addListeners(ipcBus)
}

export function removeListeners(ipcBus) {
  Ui.removeListeners(ipcBus)
  Rpc.removeListeners(ipcBus)

  Networks.removeListeners(ipcBus)
  Accounts.removeListeners(ipcBus)
}
