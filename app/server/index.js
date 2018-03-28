import server from './providers/ws';

// Export some basic functions
export default {
  Start: async () => {
    const port = process.env.PORT || 4545;
    console.log("Starting Server on port: ", port);
    return server.listen(port)
  },
  Stop: () => {
    console.log("Stopping Server");

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
