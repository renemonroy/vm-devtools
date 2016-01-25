'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
  if ( process.platform != 'darwin' ) app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width : 800,
    height : 600,
    frame : false
  });
  if ( process.env && process.env.NODE_ENV == 'development' ) {
    mainWindow.loadURL('http://localhost:8081');
  } else {
    mainWindow.loadURL('file://' + __dirname + '/dist/index.html');
  }
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});