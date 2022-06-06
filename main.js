const path = require('path');
const {app, BrowserWindow, Menu, dialog} = require('electron');
const isDev = require('electron-is-dev');
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main');

// setup the titlebar main process
setupTitlebar();

function createWindow(p_height, p_width) {
  // Create the browser window.
  const win = new BrowserWindow({
    titleBarStyle: 'hidden',
    backgroundColor: '##1c1c1c',

    minWidth: 640,
    minHeight: 600,
    width: p_width,
    height: p_height,

    //maximize: true,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }

  });

  // win.maximize();
  const menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        {
           label:'Open File',
           accelerator: 'CmdOrCtrl+O',
           // this is the main bit hijack the click event 
           click() {
              // construct the select file dialog 
              dialog.showOpenDialog({
                properties: ['openFile']
              })
              .then(function(fileObj) {
                 // the fileObj has two props 
                 if (!fileObj.canceled) {
                   mainWindow.webContents.send('FILE_OPEN', fileObj.filePaths)
                 }
              })
  // should always handle the error yourself, later Electron release might crash if you don't 
              .catch(function(err) {
                 console.error(err)  
              })
           } 
       },
       {
           label:'Exit',
           click() {
              app.quit()
           } 
         }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)
  
  // location of React App
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  attachTitlebarToWindow(win);

  win.once('ready-to-show', () => {
    win.show()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // We cannot require the screen module until the app is ready.
  const { screen } = require('electron')

  // Create a window that fills the screen's available work area.
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  createWindow(height, width);
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
