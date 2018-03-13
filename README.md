# Bastet - Your Account and DApp Guardian

WIP for https://github.com/aragon/nest/pull/20

Some documentation here: https://github.com/verdverm/nest/tree/master/grants/Bastet

### Setup

Make sure you have ganache-cli installed.

Run `ganache-cli -i 22323`

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

