export const PENDING_REQUEST = 'PENDING_REQUEST';
export const APPROVE_REQUEST = 'APPROVE_REQUEST';
export const DENY_REQUEST    = 'DENY_REQUEST';

export function pendingRequest(results) {
  console.log("pending", results)
  return {
    type: PENDING_REQUEST,
    payload: results
  }
}

export function approveRequest(results) {
  console.log("approve", results)
  return {
    type: APPROVE_REQUEST,
    payload: results
  }
}

export function denyRequest(results) {
  console.log("deny", results)
  return {
    type: DENY_REQUEST,
    payload: results
  }
}

export function notifyPending(transaction) {
  store.dispatch(pendingRequest(transaction))
}
