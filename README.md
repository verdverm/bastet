# Bastet - Your Account and DApp Guardian

WIP for https://github.com/aragon/nest/pull/20

Descriptions and early documentation here: https://github.com/verdverm/nest/tree/master/grants/Bastet

### Proof-of-concept Status

- Transaction signing UX
    - Interecpts Dapp request in proxy
    - Presents TX details to user for approval / denial
    - Signs transaction with private key and sends to the chain for execution
    - Sends user's response to Dapp
- Dapp proxy to prevent direct communication with the chains
- Separate Node processes for isolation of sensative data handling
- Secure IPC, because Electron IPC is not
- Works on all required Operating Systems
- _Should_ work with all Dapps against `ganache-cli -i 22323 --seed 22323 -d`

### Setup

Make sure you have ganache-cli installed.

Run `ganache-cli -i 22323 --seed 22323 -d`

```bash
# Get Bastet and the demo dapp
git clone https://github.com/verdverm/bastet
git clone https://github.com/verdverm/bastet-poc-demo-app

# Get bastet up and running
cd bastet
# (while still early in dev)
# add the private key for the first account to app/server/funcs.js:11
yarn
yarn dev

# Get the Demo app up and running
cd ../bastet-poc-demo-app
yarn
yarn compile
yarn migrate
yarn dev
```

You should now be able to use the Demo Dapp
proxied through Bastet!
Currently, when you signup, the transaction
is signed with the accoutn private key
and then sent to the network.

More to come!

---

The name __Bastet__ comes from an Egyptian diety for protection. ([Bastet - Wikipedia](https://en.wikipedia.org/wiki/Bastet))

