import { BrowserWindow } from 'electron';
import MenuBuilder from './menu';
let mainWindow = null;

const createMainWindow = async () => {
	if ( mainWindow !== null ) {
		return
	}

  mainWindow = new BrowserWindow({
    title: "Bastet",
    show: false,
    backgroundColor: '#2e2c29',
    width: 600,
    height: 900,
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  return mainWindow
}


export default createMainWindow;
