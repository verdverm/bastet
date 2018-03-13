// Classes
var NodeProcess = (function () {

    function NodeInstance() {
        this.process = spawnNodeInstance('NodeInstance.js');
        this.process.stdout.addListener('data', data => { console.log('<NODE> ' + data.toString()); });
        this.process.stderr.addListener('data', data => { console.log('<NODE> ' + data.toString()); });
        console.log('<MAIN> Node instance #' + this.process.pid + ' started !');
    }

    function NodeProcess(processId) {
        var self = this;

        var nodeWindow = null;
        var processMainToView = null;

        var nodeInstance = null;

        // Listen view messages
        var processMainFromView = new ProcessConnector('node', ipcMain, processId);
        processMainFromView.onRequestMessage(onIPCElectron_RequestMessage);
        processMainFromView.onSendMessage(onIPCElectron_SendMessage);
        processMainFromView.onSubscribe(onIPCElectron_Subscribe);
        processMainFromView.onUnsubscribe(onIPCElectron_Unsubscribe);

        // Create node process
        nodeInstance = new NodeInstance();
        nodeInstance.process.on('message', onIPCProcess_Message);
        nodeInstance.process.send(JSON.stringify({ action: 'init', args: { title: 'Node', type: 'node', id: processId } }));
        nodeInstance.process.on('exit', function () {
            if (nodeWindow) {
                nodeWindow.close();
                nodeWindow = null;
            }
        });

        // Create node window
        nodeWindow = new BrowserWindow({
            width: width, height: 600,
            autoHideMenuBar: true,
            webPreferences:
            {
                preload: preloadFile
            }
        });
        processMainToView = new ProcessConnector('node', nodeWindow.webContents, processId);
        nodeWindow.loadURL(commonViewUrl);
        nodeWindow.webContents.on('dom-ready', function () {
            nodeWindow.webContents.send('initializeWindow', { title: 'Node', type: 'node', id: processId, peerName: 'Node_' + nodeInstance.process.pid, webContentsId: nodeWindow.webContents.id });
        });

        nodeWindow.on('close', function () {
            nodeWindow = null;
            self.term();
        });

        this.term = function _term() {
            if (nodeInstance) {
                nodeInstance.process.kill();
                nodeInstance = null;
            }
        };

        this.onClose = function _onClose(callback) {
            nodeInstance.process.on('exit', function () {
                callback(processId);
            });
        };

        function onIPCProcess_Message(data) {
            var msgJSON = JSON.parse(data);
            if (msgJSON.hasOwnProperty('action')) {
                switch (msgJSON['action']) {
                    case 'receivedRequestThen':
                        processMainToView.postRequestThen(msgJSON['requestPromiseResponse']);
                        break;
                    case 'receivedRequestCatch':
                        processMainToView.postRequestCatch(msgJSON['requestPromiseResponse']);
                        break;
                    case 'receivedSend':
                        processMainToView.postReceivedMessage(msgJSON['args']['event'], msgJSON['args']['content']);
                        break;
                    case 'subscribe':
                        processMainToView.postSubscribeDone(msgJSON['topic']);
                        break;
                    case 'unsubscribe':
                        processMainToView.postUnsubscribeDone(msgJSON['topic']);
                        break;
                }
            }
        };

        function onIPCElectron_Subscribe(topicName) {
            console.log('Node - onIPCElectron_Subscribe:' + topicName);
            var msgJSON = {
                action: 'subscribe',
                topic: topicName
            };
            nodeInstance.process.send(JSON.stringify(msgJSON));
        };

        function onIPCElectron_Unsubscribe(topicName) {
            console.log('Node - onIPCElectron_Subscribe:' + topicName);
            var msgJSON = {
                action: 'unsubscribe',
                topic: topicName
            };
            nodeInstance.process.send(JSON.stringify(msgJSON));
            processMainToView.postUnsubscribeDone(topicName);
        };

        function onIPCElectron_RequestMessage(topicName, topicMsg) {
            console.log('Node - onIPCElectron_RequestMessage : topic:' + topicName + ' msg:' + topicMsg);
            var msgJSON = {
                action: 'request',
                args: { topic: topicName, msg: topicMsg }
            };
            nodeInstance.process.send(JSON.stringify(msgJSON));
        };

        function onIPCElectron_SendMessage(topicName, topicMsg) {
            console.log('Node - onIPCElectron_SendMessage : topic:' + topicName + ' msg:' + topicMsg);
            var msgJSON = {
                action: 'send',
                args: { topic: topicName, msg: topicMsg }
            };
            nodeInstance.process.send(JSON.stringify(msgJSON));
        };
    }

    return NodeProcess;

})();

export default NodeProcess;
