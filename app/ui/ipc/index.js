import ProcessConnector from '../../proc/ProcessConnector';

import * as Handlers from './onHandlers';

var processId;
var peerName;
var processToMaster = null;
var processToMonitor = null;

function initIpc() {
  console.log("INITING BROWSER IPC")

  return new Promise((resolve, reject) => {
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

        let prom = ipcBus.connect();
        prom.then(() => {
            console.log('browser : connected to ipcBus');
          });
        resolve(prom);
      }

      if (args['type'] === 'renderer') {

        let prom = ipcBus.connect();
        prom.then(() => {
            console.log('renderer : connected to ipcBus');
            // perfTests.connect();
          });
        resolve(prom);
      }

      if (args['type'] === 'node') {
        processToMonitor.onRequestThen(Handlers.onIPCBus_OnRequestThen);
        processToMonitor.onRequestCatch(Handlers.onIPCBus_OnRequestCatch);
        processToMonitor.OnReceivedMessage(Handlers.onIPCBus_ReceivedSendNotify);
        processToMonitor.onSubscribeDone(Handlers.onIPCElectron_SubscribeNotify);
        processToMonitor.onUnsubscribeDone(Handlers.onIPCElectron_UnsubscribeNotify);

        let prom = ipcBus.connect();
        prom.then(() => {
            console.log('node : connected to ipcBus');
          });
        resolve(prom);
      }
    })

  })

}


export default {
  initIpc,
}

