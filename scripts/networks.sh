#!/bin/bash
set -euo pipefail

WHAT=$1

mainnet () {
  geth  --syncmode "light" --rpc --rpcport 10545 --port 30304
}

testnet () {
  geth --rinkeby --syncmode "light" --rpc --rpcport 9545 --unlock "0x839d16151b3132103a584ac5b424bf500e041015"
}

ganache () {
  ganache-cli -i 22323
}

case "$WHAT" in
  "mainnet" | "main")
    mainnet
    ;;
  "testnet" | "test")
    testnet
    ;;
  "ganache" | "local")
    ganache
    ;;

  *)
    echo "Uknown network: '$WHAT'"
    exit 1
    ;;
esac
