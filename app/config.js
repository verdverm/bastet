import path from 'path';

// Configuration
const ipcBusPath = '/bastet';

// Window const
const preloadFile = path.join(__dirname, 'preload-ui.bundled.js');

export default {
  ipcBusPath,
  preloadFile
}
