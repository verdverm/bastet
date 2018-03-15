export function onIPCElectron_SubscribeNotify(topicName) {
    console.log('onIPCElectron_SubscribeNotify:' + topicName);
}

export function onIPCElectron_UnsubscribeNotify(topicName) {
    console.log('onIPCElectron_UnsubscribeNotify:' + topicName);
}

export function onIPCBus_OnRequestThen(requestPromiseResponse) {
    console.log('onIPCBus_OnRequestThen : requestPromiseArgs:' + requestPromiseResponse);
}

export function onIPCBus_OnRequestCatch(requestPromiseResponse) {
    console.log('onIPCBus_OnRequestCatch : err:' + requestPromiseResponse.payload);
}

export function onIPC_Received(ipcBusEvent, ipcContent) {
    console.log('onIPCBus_received : msgTopic:' + ipcBusEvent.channel + ' from #' + ipcBusEvent.sender.name)
}

export function onIPC_EmitReceived(ipcBusEvent, ipcContent1, ipcContent2, ipcContent3) {
    console.log('onIPC_EmitReceived : msgTopic:' + ipcBusEvent.channel + ' from #' + ipcBusEvent.sender.name)
}

export function onIPCBus_ReceivedSendNotify(ipcBusEvent, ipcContent) {
    onIPC_Received(ipcBusEvent, ipcContent);
}
