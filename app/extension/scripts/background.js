const extension = require('extensionizer');

extension.browserAction.onClicked.addListener(tab => extension.tabs.executeScript(tab.ib, {file: 'scripts/inject-bastet-web3.js'}))
