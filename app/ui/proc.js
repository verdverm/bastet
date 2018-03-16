import { ipcMain, BrowserWindow } from 'electron';

import ProcessConnector from '../proc/ProcessConnector';
import { preloadFile } from '../proc/config';

import MenuBuilder from './menu';

var MainProcess = (function () {

  const peerName = 'Main';

  async function MainProcess() {

    try {

      console.log('<MAIN> MainProcess is running');

      var self = this;
      var processId = 1;
      var perfView = null;
      var instances = new Map;

      // Listen view messages
      var processMainFromView = new ProcessConnector('browser', ipcMain);
      processMainFromView.onRequestMessage(onIPCElectron_RequestMessage);
      processMainFromView.onSendMessage(onIPCElectron_SendMessage);
      processMainFromView.onSubscribe(onIPCElectron_Subscribe);
      processMainFromView.onUnsubscribe(onIPCElectron_Unsubscribe);
      processMainFromView.on('new-process', doNewProcess);
      processMainFromView.on('new-renderer', doNewRenderer);
      processMainFromView.on('queryState', doQueryState);

      console.log('<MAIN> ProcessConnect ready');

      const mainWindow = new BrowserWindow({
        title: "Bastet",
        center: true,
        width: 900,
        height: 900,
        backgroundColor: '#2e2c29',
        // autoHideMenuBar: true,
        webPreferences:
        {
          preload: preloadFile,
          // webSecurity: false
        }
      });

      /*
      mainWindow.webContents.on('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
      });
      */

      mainWindow.on('close', function () {
          let keysTmp = [];
          for (let key of instances.keys()) {
              keysTmp.push(key);
          }
          for (let key of keysTmp) {
              instances.get(key).term();
          }
      });

      mainWindow.loadURL(`file://${__dirname}/../app.html`);
      /*
      if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL(`file://${__dirname}/../app.html`);
      } else {
        mainWindow.loadURL(`file:///app.html`);
      }
      */

      const menuBuilder = new MenuBuilder(mainWindow);
      menuBuilder.buildMenu();

      console.log('<MAIN> Main window ready');

      var processMainToView = new ProcessConnector('browser', mainWindow.webContents);
      mainWindow.webContents.on('dom-ready', function () {
        console.log("DOM READY")
        mainWindow.webContents.send('initializeWindow', { title: 'Main', type: 'browser', id: 0, peerName: peerName, webContentsId: mainWindow.webContents.id });
      });

      function doNewProcess(processType) {
          var newProcess = null;
          switch (processType) {
              case 'renderer':
                  newProcess = new RendererProcess(processId);
                  break;
              case 'node':
                  newProcess = new NodeProcess(processId);
                  break;
          }
          if (newProcess != null) {
              instances.set(processId, newProcess);
              newProcess.onClose(function (localProcessId) {
                  instances.delete(localProcessId);
              });
              ++processId;
          }
      }

      function doNewRenderer(processId) {
          var rendererProcess = instances.get(processId);
          if (rendererProcess != null) {
              rendererProcess.createWindow();
          }
      }

      function doQueryState() {
          if (ipcBroker) {
              var queryState = ipcBroker.queryState();
              mainWindow.webContents.send('get-queryState', queryState);
          }
          if (ipcBrokerProcess) {
              ipcBrokerProcess.once('message', (msgJSON) => {
                  var queryState = msgJSON.result;
                  mainWindow.webContents.send('get-queryState', queryState);
              });
              ipcBrokerProcess.send(JSON.stringify({action: 'queryState'}));

          }
      }

      function onIPCElectron_ReceivedMessage(ipcBusEvent, ipcContent) {
          console.log('Master - ReceivedMessage - topic:' + ipcBusEvent.channel + 'from #' + ipcBusEvent.sender.name);
          if (ipcBusEvent.request) {
              ipcBusEvent.request.resolve(ipcBusEvent.channel + ' - AutoReply from #' + ipcBusEvent.sender.name);
          }
          processMainToView.postReceivedMessage(ipcBusEvent, ipcContent);
      }

      function onIPCElectron_Subscribe(topicName) {
          console.log('Master - onIPCElectron_Subscribe:' + topicName);
          ipcBusClient.on(topicName, onIPCElectron_ReceivedMessage);
          processMainToView.postSubscribeDone(topicName);
      }

      function onIPCElectron_Unsubscribe(topicName) {
          console.log('Master - onIPCElectron_Subscribe:' + topicName);
          ipcBusClient.off(topicName, onIPCElectron_ReceivedMessage);
          processMainToView.postUnsubscribeDone(topicName);
      }

      function onIPCElectron_SendMessage(topicName, topicMsg) {
          console.log('Master - onIPCElectron_SendMessage : topic:' + topicName + ' msg:' + topicMsg);
          ipcBusClient.send(topicName, topicMsg);
      }

      function onIPCElectron_RequestMessage(topicName, topicMsg) {
          console.log('Master - onIPCElectron_RequestMessage : topic:' + topicName + ' msg:' + topicMsg);
          ipcBusClient.request(2000, topicName, topicMsg)
              .then((requestPromiseResponse) => {
                  processMainToView.postRequestThen(requestPromiseResponse);
              })
              .catch((requestPromiseResponse) => {
                  processMainToView.postRequestCatch(requestPromiseResponse);
              });
      }

    } catch (e) {
      console.log(e)
    }
  }
  return MainProcess;
})();

export default MainProcess;
