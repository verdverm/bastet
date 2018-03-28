import * as Accts from './rpc';

export function addListeners(ipcBus) {

  ipcBus.on('app/getAccounts', async (ipcBusEvent, payload) => {
    console.log("IPC getting accounts", ipcBusEvent, payload)
    var accounts = await Accts.getAccounts(payload.netId)
    ipcBus.send('app/accounts', accounts);
  });

  ipcBus.addListener('app/getAccount', (ipcBusEvent, payload) => {
    var account = Accts.getAccount(payload.netId, payload.acctId);
    ipcBus.send('app/account', account);
  });

  ipcBus.addListener('app/unlockAccount', (ipcBusEvent, payload) => {
    var accounts = Accts.unlockAccount(payload.netId, payoad.acctId);
    ipcBus.send('app/accounts', accounts);
  });

  ipcBus.addListener('app/lockAccount', (ipcBusEvent, payload) => {
    var accounts = Accts.lockAccount(payload.netId, payoad.acctId);
    ipcBus.send('app/accounts', accounts);
  });

  ipcBus.addListener('app/addAccount', (ipcBusEvent, payload) => {
    var accounts = Accts.addAccount(payload.name, payload.location);
    ipcBus.send('app/accounts', accounts);
  });

  ipcBus.addListener('app/updateAccount', (ipcBusEvent, payload) => {
    var accounts = Accts.updateAccount(patload.netId, payload.account);
    ipcBus.send('app/accounts', accounts);
  });

  ipcBus.addListener('app/deleteAccount', (ipcBusEvent, payload) => {
    var accounts = Accts.deleteAccount(payload.netId, payload.acctId);
    ipcBus.send('app/accounts', accounts);
  });

  ipcBus.addListener('app/setDefaultAccount', (ipcBusEvent, payload) => {
    var accounts = Accts.setDefaultAccount(payload.netId, payload.acctId);
    ipcBus.send('app/accounts', accounts);
  });

}

export function removeListeners(ipcBus) {
}

