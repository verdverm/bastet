import path from 'path';

// Configuration
const ipcBusPath = '/bastet';

// Window const
const preloadFile = path.join(__dirname, 'BundledBrowserWindowPreload.js');

export default {
  ipcBusPath,
  preloadFile
}
