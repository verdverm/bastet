import ProcessConnector from '../../proc/ProcessConnector';

import * as Handlers from './onHandlers';

import { sendRequest } from './send.js';

var processId;
var peerName;
var processToMaster = null;
var processToMonitor = null;

function initIpc() {
  console.log("INITING BROWSER IPC")

  ipcRenderer.on('initializeWindow', function (event, data) {
    // In sandbox mode, 1st parameter is no more the event, but the 2nd argument !!!
    const args = (data !== undefined) ? data : event;
    console.log('initializeWindow', args);

    var processId = args['id'];
    var peerName  = args['peerName'];

    processToMaster = new ProcessConnector('browser', ipcRenderer);
    processToMonitor = new ProcessConnector(args['type'], ipcRenderer, processId);

    window.processToMaster = processToMaster;
    window.processToMonitor = processToMonitor;

    if (args['type'] === 'browser') {
      processToMonitor.onRequestThen(Handlers.onIPCBus_OnRequestThen);
      processToMonitor.onRequestCatch(Handlers.onIPCBus_OnRequestCatch);
      processToMonitor.OnReceivedMessage(Handlers.onIPCBus_ReceivedSendNotify);
      processToMonitor.onSubscribeDone(Handlers.onIPCElectron_SubscribeNotify);
      processToMonitor.onUnsubscribeDone(Handlers.onIPCElectron_UnsubscribeNotify);

      ipcBus.connect()
        .then(() => {
          console.log('browser : connected to ipcBus');
          ipcBus.on('app/signing-request', async (ipcBusEvent, payload) => {
            console.log("Signing Request!", ipcBusEvent, payload)
            await sendRequest(payload)
            console.log("Signing Request Sent")
          })
        });
    }

    if (args['type'] === 'renderer') {

      ipcBus.connect()
        .then(() => {
          console.log('renderer : connected to ipcBus');
          // perfTests.connect();
        });
    }

    if (args['type'] === 'node') {
      processToMonitor.onRequestThen(Handlers.onIPCBus_OnRequestThen);
      processToMonitor.onRequestCatch(Handlers.onIPCBus_OnRequestCatch);
      processToMonitor.OnReceivedMessage(Handlers.onIPCBus_ReceivedSendNotify);
      processToMonitor.onSubscribeDone(Handlers.onIPCElectron_SubscribeNotify);
      processToMonitor.onUnsubscribeDone(Handlers.onIPCElectron_UnsubscribeNotify);

      ipcBus.connect()
        .then(() => {
          console.log('node : connected to ipcBus');
        });
    }
  })

}


export default {
  initIpc,
}

