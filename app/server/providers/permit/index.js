import { getDappByOrigin } from '../../../modules/dapps/server/lib';

import { newDappUX } from './add';
import { checkRPC } from './rpc';

export function checkDapp(origin, network, rpcReq) {
  console.log("Checking Dapp")
  var fail = null;

  const dapp = getDappByOrigin(origin);
  if (dapp === undefined) {
    return newDappUX(origin);
  }

  fail = checkRPC(origin, network, rpcReq);
  if (fail !== null) {
    return fail;
  }

  return fail;
}

