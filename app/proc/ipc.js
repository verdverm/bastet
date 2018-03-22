// @flow
// Load modules
// import ipcBusModule from 'electron-ipc-bus';
const ipcBusModule = require("electron-ipc-bus");

import { spawnNodeInstance } from './spawn';
import { ipcBusPath } from '../config';

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

  // console.log("setting up mainProc IpcBusClient:", ret, ipcBusClient)

  // Channel for Bastet UI ux events and management (electron part of Bastet UI)
  ipcBusClient.addListener('ui', (ipcBusEvent, payload) => {
    console.log("IPC-UI: ", ipcBusEvent, payload)

  });

  // Channel for Bastet UI application specifics and intentions (admin part of Bastet UI)
  ipcBusClient.addListener('app', (ipcBusEvent, payload) => {
    console.log("IPC-APP: ", ipcBusEvent, payload)

  });

  // Channel for Bastet UI rpc  (ethereum part of Bastet UI)
  ipcBusClient.addListener('rpc', (ipcBusEvent, payload) => {
    console.log("IPC-RPC: ", ipcBusEvent, payload)

  });
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
