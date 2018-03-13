// Load modules
// import ipcBusModule from 'electron-ipc-bus';
const ipcBusModule = require("electron-ipc-bus");

import { ipcBusPath } from './config';

// Debug
// ipcBusModule.ActivateIpcBusTrace(true);
// ipcBusModule.ActivateServiceTrace(true);

// IPC Server Components
let ipcBroker = null;
let ipcBridge = null;

// "Server-side" IPC client
let ipcClient = null;

// Client listeners
const setListeners = () => {
  // One channel for ui management
  ipcClient.addListener('ui', (ipcBusEvent, payload) => {
    console.log("IPC-UI: ", ipcBusEvent, payload)

  });

  // Separate channel for application specifics and intentions
  ipcClient.addListener('app', (ipcBusEvent, payload) => {
    console.log("IPC-APP: ", ipcBusEvent, payload)

  });
}

export default {

  Start: async () => {
    ipcBroker = ipcBusModule.CreateIpcBusBroker(ipcBusPath);
    ipcBridge = ipcBusModule.CreateIpcBusBridge(ipcBusPath);
    ipcClient = ipcBusModule.CreateIpcBusClient(ipcBusPath);
    await ipcBroker.start()
    await ipcBridge.start()
    await ipcClient.connect('main')
    setListeners();
  },

  Stop: async () => {
    await ipcClient.close()
    await ipcBridge.stop()
    await ipcBroker.stop()
    ipcBroker = null;
    ipcBridge = null;
    ipcClient = null;
  },

  ipcBroker,
  ipcBridge,
  ipcClient,
}
