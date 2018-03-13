// Load modules
const ipcBusModule = require("electron-ipc-bus");
const app = require('electron').app;

// Configuration
const ipcBusPath = '/bastet/ui';

// IPC Server Components
const ipcBusBroker = ipcBusModule.CreateIpcBusBroker(ipcBusPath);
const ipcBusBridge = ipcBusModule.CreateIpcBusBridge(ipcBusPath);

// "Server-side" IPC client
const ipcClient = ipcBusModule.CreateIpcBusClient(ipcBusPath);


const setChannels = () => {
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
    await ipcBusBroker.start()
    await ipcBusBridge.start()
    await ipcClient.connect('main')
    setChannels();
  },
  Stop: async () => {
    await ipcClient.close()
    await ipcBusBridge.stop()
    await ipcBusBroker.stop()
  },
  ServerIpcClient: ipcClient
}
