export default function (web3, method, args, callback) {
  console.log("RPC proxy", method, args)

  if (method.substr(0,4) == 'eth_') {
    const er = method.substr(4);
    const meth = web3.eth[er]
    console.log("RPC ETH:", er)
    meth(...args, callback)
  } else {
    switch (method) {
      case 'eth_call':
        web3.eth.call(...args, callback)

      default:
        const msg = `Error: unknown method '${method}'`
        callback(msg, null)
    }
  }

  console.log("RPC proxy returning")

}
