export function addListeners(ipcBus) {
  ipcBus.addListener('ui', (ipcBusEvent, payload) => {
    console.log("IPC-UI: ", ipcBusEvent, payload)
  });
}

export function removeListeners(ipcBus) {
}


