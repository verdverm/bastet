export function doNewNodeProcess(event) {
    processToMaster.send('new-process', 'node');
}

export function doNewRendererProcess(event) {
    processToMaster.send('new-process', 'renderer');
}

export function doNewRendererInstance(event) {
    processToMaster.send('new-renderer', processId);
}

export function doOpenPerfView(event) {
    processToMaster.send('new-perf');
}

export function doQueryBrokerState() {
//    processToMaster.send('queryState');
    ipcBus.request(2000, ipcBus_QUERYSTATE_CHANNEL)
        .then((ipcBusRequestResponse) => onIPC_BrokerStatusTopic(ipcBusRequestResponse.payload));
}

