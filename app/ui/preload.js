//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Electron Test App

console.log("preload")

window.ipcBus = require('electron-ipc-bus').CreateIpcBusClient();
window.ipcBus_QUERYSTATE_CHANNEL = require('electron-ipc-bus').IPCBUS_CHANNEL_QUERY_STATE;
require('electron-ipc-bus').ActivateIpcBusTrace(true);

window.ipcRenderer = require('electron').ipcRenderer;

var content = require('../app.html');

console.log("preload!!", content)
console.log("window", window)

/*
window.onload = () => {
  document.open("text/html", "replace");
  document.write(content);  // htmlCode is the variable you called newDocument
  document.close();
}
*/

