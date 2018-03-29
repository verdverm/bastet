import * as Lib from './lib';

// This is basically the API
// It uses the library
//   and is consumed by ipc (and eventually others)

export default {
  getDapps: () => {
    return Lib.getDapps();
  },
  blockDapp: (dappId) => {
    return Lib.blockDapp(dappId);
  },
  unblockDapp: (dappId) => {
    return Lib.unblockDapp(dappId);
  },
}
