import path from 'path';
import child_process from 'child_process';

export function spawnNodeInstance(scriptPath, ipcBusPath) {
  try {
    const args = [path.join(__dirname, scriptPath), '--parent-pid=' + process.pid, '--bus-path=' + ipcBusPath];

    let options = { env: {} };
    for (let key of Object.keys(process.env)) {
        options.env[key] = process.env[key];
    }

    options.env['ELECTRON_RUN_AS_NODE'] = '1';
    options.stdio = ['pipe', 'pipe', 'pipe', 'ipc'];

    // console.log("Spawning", scriptPath, process.argv[0], args, options)
    return child_process.spawn(process.argv[0], args, options);
  } catch(e) {
    console.log("Caught Exception in spawnNodeInstance:", scriptPath, ipcBusPath, e)
  }

}
