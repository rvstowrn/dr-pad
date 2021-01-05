const { app, BrowserWindow } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
    width: 950,
    height: 800,
    frame: false,
    resizable: false,
    backgroundColor: '#FFF',
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile('./viewHandler/index.html');
}

app.whenReady().then(createWindow);