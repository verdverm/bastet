import uuid from 'uuid';

import { getIpcClient } from '../../../proc/ipc';
import { getDappByOrigin, addDapp } from '../../../modules/dapps/server/lib';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function newDappUX(origin, callback) {
  console.log("New Dapp UX")

  const exists = getDappByOrigin(origin);
  if (exists) {
    console.log("Dapp exists", exists)
    return
  }
  var req = {
    type: 'New Dapp',
    id: uuid(),
    origin,
    pending: true,
  }

  addDapp(exists)

  let ipcBusClient = getIpcClient();

  ipcBusClient.send("app/notifications", req);

  ipcBusClient.once("app/notifications:"+req.id, (ipcBusEvent, resp) => {

    console.log("Received New Dapp Response:", ipcBusEvent, resp)
    let { approve } = resp;

    if (approve === false) {
      console.log("DENIED !!!")
      callback("denied", "denied")

    } else {
      var dappConfig = resp;
      dappConfig.blocked = false;
      delete dappConfig.approve;

      console.log("APPROVAL !!!", dappConfig)

      // Save the Dapp
      addDapp(dappConfig)
    }

  });
}
