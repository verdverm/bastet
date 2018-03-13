import path from 'path';
import child_process from 'child_process';

import ipcBusModule from 'electron-ipc-bus';
import { ipcBasPath } from './config';

let ipcBrokerProcess = null;
let ipcBroker = null;

// Helpers
function spawnNodeInstance(scriptPath) {
    const args = [path.join(__dirname, scriptPath), '--parent-pid=' + process.pid, '--bus-path=' + ipcBusPath];

    let options = { env: {} };
    for (let key of Object.keys(process.env)) {
        options.env[key] = process.env[key];
    }

    options.env['ELECTRON_RUN_AS_NODE'] = '1';
    options.stdio = ['pipe', 'pipe', 'pipe', 'ipc'];
    return child_process.spawn(process.argv[0], args, options);
}
