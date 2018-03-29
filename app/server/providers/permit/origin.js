import { getDappByOrigin } from '../../../modules/dapps/server/lib';

export function checkOrigin(origin, network, rpcReq) {
  console.log("Checking Dapp Origin")
  var fail = null;

  const dapp = getDappByOrigin(origin);
  if (dapp && dapp.blocked) {
    fail = 'Dapp has been blocked';
  }
  if (dapp && dapp.blocked === false) {
    // we have a dapp, and it has been unblocked...
    // meaning it should have already passed the phishing check
    return fail;
  }

  fail = checkPhishing(origin);
  if (fail !== null) {
    return fail;
  }

  return fail;
}

function checkPhishing(origin) {
  var fail = null;

  // there are open-source listings out there to use

  return fail;
}

