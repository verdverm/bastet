// @flow
// Load modules
// import ipcBusModule from 'electron-ipc-bus';
const ipcBusModule = require("electron-ipc-bus");

import { spawnNodeInstance } from './spawn';
import { ipcBusPath } from '../config';

import { addListeners, removeListeners } from '../server/ipc';

// Debug
ipcBusModule.ActivateIpcBusTrace(true);
// ipcBusModule.ActivateServiceTrace(true);

// IPC Server Components
let ipcBrokerProcess = null;
let ipcBroker = null;
let ipcBridge = null;

// IPC Bus Client
let ipcBusClient = null;

// Client listeners
const initIpcBusClient = async () => {
  ipcBusClient = ipcBusModule.CreateIpcBusClient(ipcBusPath);
  let ret = await ipcBusClient.connect();

  addListeners(ipcBusClient)

}

const initIpcBridge = async () => {
  console.log("setting up IPC bridge")
  ipcBridge = ipcBusModule.CreateIpcBusBridge(ipcBusPath);
  await ipcBridge.start()
}

const initIpcBroker = async (useBrokerProc?: boolean) => {
  if (useBrokerProc === true) {
    console.log("REMOTE BROKER !!!")
    // Setup Remote Broker
    ipcBrokerProcess = spawnNodeInstance('BrokerNodeInstance.js', ipcBusPath);
    ipcBrokerProcess.on('message', async function (msg) {
      console.log('<MAIN> IPC broker is ready !');

      await initIpcBridge();
      await initIpcBusClient();
    });
    // ipcBrokerProcess.stdout.addListener('data', data => { console.log('<BROKER> ' + data.toString()); });
    // ipcBrokerProcess.stderr.addListener('data', data => { console.log('<BROKER> ' + data.toString()); });
  } else {
    ipcBroker = ipcBusModule.CreateIpcBusBroker(ipcBusPath);
    await ipcBroker.start()
    await initIpcBridge();
    await initIpcBusClient();
  }
}

export default {

  Start: async (useBrokerProc?: boolean) => {
    await initIpcBroker(useBrokerProc)
  },

  Stop: async () => {
    if (ipcBusClient !== null) {
      await ipcBusClient.close()
      ipcBusClient = null;
    }
    if (ipcBridge !== null) {
      await ipcBridge.stop()
    }
    if (ipcBroker !== null) {
      await ipcBroker.stop()
    }
    if (ipcBrokerProcess !== null) {
      await ipcBrokerProcess.stop()
    }
  },

  ipcBrokerProcess,
  ipcBroker,
  ipcBridge,
  ipcBusClient,

  getIpcClient: () => {
    return ipcBusClient
  }
}
