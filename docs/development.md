# Developing Bastet


### Clone and run

```bash
git clone https://github.com/verdverm/bastet

# Get bastet up and running
cd bastet
# (while still early in dev)
# add the private key for the first account to app/server/funcs.js:11
yarn
yarn dev
```

### Setup a Ethereum blockchain

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

### Notes

Sometimes you have to quit the application completely
for all code changes to be picked up.
