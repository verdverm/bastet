import { getNetworkWithWeb3 } from '../../networks/server/lib';

export async function getAccounts(netId) {
  const network = getNetworkWithWeb3(netId);

  if (network === undefined) {
    return {
      error: "unknkown network with id: " + netId
    }
  }
  if (network.connected === false) {
    return {
      error: "network with id: " + netId + " is not connected. Please connect first."
    }
  }

  const web3 = network.web3;

  var accts = await web3.eth.getAccounts();

  const promises = accts.map((acct) => {
    const localAcct = acct;
    return enrich(web3, localAcct)

  })

  var accounts = [];
  await Promise.all(promises).then((values) => {
    accounts = values;
  })

  return accounts;

}

async function enrich (web3, acct) {
  return {
    id: acct,
    default: false,
    unlocked: false,
    key: false
  }
}

