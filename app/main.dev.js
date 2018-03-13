/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import uuid from 'uuid';
import util from 'util';
import { EventEmitter } from 'events';

import { app, session, ipcMain, BrowserWindow } from 'electron';

import ipcSystem from './ipc';
import bastetServer from './server';

import MenuBuilder from './menu';
import createMainWindow from './mainwin';


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', async () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  /*
  if (process.platform !== 'darwin') {
    app.quit();
  }
  */

  // Let's actually do nothing when all windows are closed
  // on any platform, there is a server running.
  // The user needs to explicitly quit the application
  console.log("platform:", process.platform)
});

app.on('will-quit', async () => {
  console.log("will be quitting...")
  // The User really wants the application closed, so stop the server
  await bastetServer.Stop()
  await ipcSystem.Stop();
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  await ipcSystem.Start();
  bastetServer.Start();
  await createMainWindow();
});

