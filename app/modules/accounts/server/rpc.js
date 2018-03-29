import * as Accts from './lib';

export default {
  getAccounts: (netId) => {
    return Accts.getAccounts(netId);
  },
  getAccount: (netId, acctId) => {
    return Accts.getAccount(netId, acctId);
  },
  unlockAccount: (netId, acctId) => {
    console.log("Unlock - RPC", netId, acctId);
    return Accts.unlockAccount(netId, acctId);
  },
  lockAccount: (netId, acctId) => {
    return Accts.lockAccount(netId, acctId);
  },
  addAccount: (netId, name, location) => {
    return Accts.addAccount(name, location);
  },
  updateAccount: (netId, account) => {
    return Accts.updateAccount(account);
  },
  deleteAccount: (netId, acctId) => {
    return Accts.deleteAccount(netId, acctId);
  },
  setDefaultAccount: (netId, acctId) => {
    return Accts.setDefaultAccount(netId, acctId);
  },
}
