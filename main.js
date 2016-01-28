'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;

var mainWindow = null;
var appIcon = null;

app.dock.hide();

app.on('window-all-closed', function() {
  if ( process.platform != 'darwin' ) app.quit();
});

app.on('ready', function() {
  appIcon = new Tray('./src/images/icon-tray-default@4x.png');
  appIcon.setPressedImage('./src/images/icon-tray-highlight@4x.png');

  mainWindow = new BrowserWindow({
    width : 570,
    height : 750,
    minWidth : 500,
    maxWidth : 900,
    minHeight : 700,
    maxHeight : 1000,
    frame : false
  });

  if ( process.env && process.env.NODE_ENV == 'development' ) {
    mainWindow.loadURL('http://localhost:8081');
  } else {
    mainWindow.loadURL('file://' + __dirname + '/dist/index.html');
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  appIcon.on('click', function(e) {
    if ( mainWindow.isFocused() ) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  }.bind(this));
});