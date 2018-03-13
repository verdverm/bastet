var RendererProcess = (function () {

    function RendererProcess(processId) {
        var rendererWindows = new Map();
        var callbackClose;
        this.createWindow = function _createWindow() {
            const rendererWindow = new BrowserWindow({
                width: width, height: 600,
                autoHideMenuBar: true,
                webPreferences:
                {
                    session: getSession(),
                    preload: preloadFile
                }
            });
            rendererWindow.loadURL(commonViewUrl);
            rendererWindow.webContents.on('dom-ready', function () {
                rendererWindow.webContents.send('initializeWindow', { title: 'Renderer', type: 'renderer', id: processId, peerName: 'Renderer_' + rendererWindow.webContents.id, webContentsId: rendererWindow.webContents.id });
            });

            rendererWindows.set(rendererWindow.webContents.id, rendererWindow);
            var key = rendererWindow.webContents.id;
            rendererWindow.on('close', () => {
                rendererWindows.delete(key);
                if (rendererWindows.size === 0) {
                    callbackClose(processId);
                }
            });
        };

        this.onClose = function _onClose(callback) {
            callbackClose = callback;
        };

        this.term = function _term() {
            let keysTmp = [];
            for (let key of rendererWindows.keys()) {
                keysTmp.push(key);
            }
            for (let key of keysTmp) {
                rendererWindows.get(key).close();
            }
        };

        function getSession() {
            var sessionName = 'persist:process' + processId;
            var session = electronSession.fromPartition(sessionName);
            return session;
        }

        this.createWindow();
    };
    return RendererProcess;
})();


