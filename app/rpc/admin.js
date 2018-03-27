import * as Nets from '../networks';

export default {
  getNetworks: () => {
    console.log("Getting Networks")
    return Nets.getNetworks();
  },
  connectNetwork: (id) => {
    return Nets.connectNetwork(id);
  },
  disconnectNetwork: (id) => {
    return Nets.disconnectNetwork(id);
  },
  addNetwork: (name, location) => {
    return Nets.addNetwork(name, location);
  },
  updateNetwork: (network) => {
    return Nets.updateNetwork(network);
  },
  deleteNetwork: (id) => {
    return Nets.deleteNetwork(id);
  },
  setDefaultNetwork: (id) => {
    return Nets.setDefaultNetwork(id);
  },
}
