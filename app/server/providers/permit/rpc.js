export function checkRPC(dapp, network, rpcReq) {
  console.log("Checking Dapp RPC")

  var fail = dapp.blocked ? 'origin is blocked' : null;
  if (fail !== null) {
    return fail;
  }

  fail = checkNetworkPermissions(dapp, network, rpcReq);
  if (fail !== null) {
    return fail;
  }

  fail = checkAccountPermissions(dapp, network, rpcReq);
  if (fail !== null) {
    return fail;
  }

  fail = checkMethodPermissions(dapp, network, rpcReq);
  if (fail !== null) {
    return fail;
  }

  fail = checkContentPermissions(dapp, network, rpcReq);
  if (fail !== null) {
    return fail;
  }

  return fail;
}

function checkNetworkPermissions(dapp, network, rpcReq) {
  var fail = null;

  return fail;
}

function checkAccountPermissions(dapp, network, rpcReq) {
  var fail = null;

  return fail;
}

function checkMethodPermissions(dapp, network, rpcReq) {
  var fail = null;

  return fail;
}

function checkContentPermissions(dapp, network, rpcReq) {
  var fail = null;

  return fail;
}

