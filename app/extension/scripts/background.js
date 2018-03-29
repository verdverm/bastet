/* globals chrome */

chrome.browserAction.onClicked.addListener(tab => chrome.tabs.executeScript(tab.ib, {file: 'scripts/inject-bastet-web3.js'}))
