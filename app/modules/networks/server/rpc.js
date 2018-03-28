import * as Nets from './lib';

export default {
  getNetworks: () => {
    return Nets.getNetworks();
  },
  getNetwork: (netId) => {
    return Nets.getNetwork(netId);
  },
  connectNetwork: (netId) => {
    return Nets.connectNetwork(netId);
  },
  disconnectNetwork: (netId) => {
    return Nets.disconnectNetwork(netId);
  },
  addNetwork: (name, location) => {
    return Nets.addNetwork(name, location);
  },
  updateNetwork: (network) => {
    return Nets.updateNetwork(network);
  },
  deleteNetwork: (netId) => {
    return Nets.deleteNetwork(netId);
  },
  setDefaultNetwork: (netId) => {
    return Nets.setDefaultNetwork(netId);
  },
}
