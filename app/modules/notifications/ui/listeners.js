export const PENDING_REQUEST = 'PENDING_REQUEST';

export function pendingRequest(results) {
  return {
    type: PENDING_REQUEST,
    payload: results
  }
}
export function listenNotifications(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    ipcBus.addListener('app/notifications', (ipcBusEvent, payload) => {
      dispatch(pendingRequest(payload));
    })
  };
}

export function unlistenNotifications(ipcBus) {
  return (dispatch: (action) => void, getState: () => null) => {
    ipcBus.removeListener('app/notifications')
  };
}


