import intercept from '../rpc/web3-intercept';
import proxy from '../rpc/web3-proxy';

import { getDefaultNetwork } from '../../modules/networks/server/lib';
import { getDappByOrigin } from '../../modules/dapps/server/lib';

import { checkOrigin } from './permit/origin';
import { newDappUX } from './permit/add';
import { checkRPC as doCheckRPC } from './permit/rpc';

// pull some information out of the request;
export function extractConnInfo(req) {
  const origin = req.headers['origin'] || req.connection.remoteAddress;
  const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return {
    origin,
    userIP
  }
}

export function checkConn(connInfo) {

  // Check Dapp
  var fail = checkOrigin(connInfo.origin);
  if (fail !== null) {
    return fail;
  }

  // Verify Dappp
  const dapp = getDappByOrigin(connInfo.origin);
  if (dapp === undefined) {
    return newDappUX(connInfo.origin);
  }

  return null
}

export function checkRPC(dapp, network, rpcReq) {

  var fail = doCheckRPC(dapp, network, rpcReq);
  if (fail !== null) {
    return fail;
  }

  return null
}

export function handleRPC(dapp, net, rpcReq, callback) {
  const method = intercept[rpcReq.method]
  if (method) {
    // One of our intercepted methods?
    console.log('RPC - intercept -', rpcReq)
    method(net.web3, rpcReq.params, callback)
  } else {
    // Proxy through to the network
    console.log('RPC - proxy - ', rpcReq)
    proxy(net.web3, rpcReq.method, rpcReq.params, callback)
  }
}
