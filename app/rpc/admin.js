import * as Nets from '../networks';

export default {
  getNetworks: () => {
    return Nets.getNetworks();
  },
  connectNetwork: (id) => {
    return Nets.connectNetwork(id);
  },
  disconnectNetwork: (id) => {
    return Nets.disconnectNetwork(id);
  }
}
