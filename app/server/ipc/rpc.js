export function addListeners(ipcBus) {
  // Channel for Bastet UI rpc  (ethereum part of Bastet UI)
  ipcBus.addListener('rpc', (ipcBusEvent, payload) => {
    console.log("IPC-RPC: ", ipcBusEvent, payload)

  });
}

export function removeListeners(ipcBus) {
}

