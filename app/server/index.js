import server from './server';

// Export some basic functions
export default {
  Start: async () => {
    console.log("Starting Server")
		return server.listen(4545);
  },
  Stop: () => {
    console.log("Stopping Server")
  }
}

/*
import path from 'path';

import { spawnNodeInstance } from '../proc/spawn';
import { ipcBusPath } from '../proc/config';

const procfile = path.join(__dirname, 'proc.js');
var process = null;
// Export some basic functions
export default {
  Start: async () => {
    console.log("Starting Server");
    // process = await spawnNodeInstance(procfile, ipcBusPath);
    console.log("Server Started");
  },
  Stop: () => {
    console.log("Stopping Server");
    // process.stop();
    console.log("Server Stopped");
  }
}
*/
