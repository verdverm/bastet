# Bastet - The Blockchain and DApp Guardian

_note, Bastet is still in development and
it is not recommended to use with wallets or accounts you value :)_

### Features

- Stand-alone application or modular setups, customized to your needs.
- Connect to multiple networks simultaneously and manage accounts with ease.
- Control Dapps access and permissions to the networks, accounts, keys, and apis.
- Security by design with isolated processes, secure IPC and customizable TLS, remote/offline signing, and modern encryption.
- Downloads available for Windows, Mac, and Linux.

### Installation & Setup

Get Bastet from
[the downloads](https://drive.google.com/open?id=1mGVt5M_3C9NwSFAMJ79G56sGX4qrL899)
or
[the developer setup](./docs/development.md)

### Setup an Ethereum blockchain

Make sure you have ganache-cli installed.

Run `ganache-cli -i 22323 --seed 22323 -d`

Follow the instructions in Bastet
to setup a default network.

### Run a demo app

```bash
git clone https://github.com/verdverm/bastet-poc-demo-app
cd bastet-poc-demo-app
yarn
yarn compile
yarn migrate
yarn dev
```

You should now be able to use the Demo Dapp
proxied through Bastet!
Currently, when you signup, the transaction
is signed with the default account private key
and then sent to the default network.

More to come!

---

The name __Bastet__ comes from an Egyptian diety for protection. ([Bastet - Wikipedia](https://en.wikipedia.org/wiki/Bastet))

This project will use a Token Currated Registry
to guide development and feature enhancements.

Example Futurology:

- Poly-chain support
  - support other blockchains (Bitcoin, Cosmos, Monero, etc...)
  - cross-chain support
  - Dapps requiring access to multiple chains simultaneously
- Super offline signing support
- Spam and scam filters, don't get phished!

