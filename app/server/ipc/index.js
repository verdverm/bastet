import * as Ui  from './ui';
import * as Rpc from './rpc';

import * as Notifications from '../../modules/notifications/server/ipc';
import * as Networks from '../../modules/networks/server/ipc';
import * as Accounts from '../../modules/accounts/server/ipc';
import * as Dapps from '../../modules/dapps/server/ipc';

export function addListeners(ipcBus) {
  Ui.addListeners(ipcBus)
  Rpc.addListeners(ipcBus)

  Networks.addListeners(ipcBus)
  Accounts.addListeners(ipcBus)
  Dapps.addListeners(ipcBus)
}

export function removeListeners(ipcBus) {
  Ui.removeListeners(ipcBus)
  Rpc.removeListeners(ipcBus)

  Networks.removeListeners(ipcBus)
  Accounts.removeListeners(ipcBus)
  Dapps.removeListeners(ipcBus)
}
