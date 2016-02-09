'use strict';

var electron = require('electron');
var colors = require('colors/safe');
var Bargain = require('./bargain');
var chokidar = require('chokidar');
var path = require('path');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var Tray = electron.Tray;
var ipcMain = electron.ipcMain;

var mainWindow = null;
var appIcon = null;
var missions = null;
var evLog = function(str) { return colors.green(str); };

var toggleApp = function(e) {
  if ( mainWindow.isFocused() ) {
    mainWindow.hide();
  } else {
    mainWindow.show();
  }
};

var onMissionsReqItemsList = function(e) {
  console.log('>>> [' + evLog('missions:req:itemslist') + ']');
  missions.updateRemoteItemsList();
};

var onMissionsReqItem = function(e, name) {
  console.log('>>> [' + evLog('missions:req:item') + '] =>', name);
  missions.updateRemoteItem(name);
};

var closeMainWindow = function() {
  ipcMain.removeListener('missions:req:itemslist', onMissionsReqItemsList);
  ipcMain.removeListener('missions:req:item', onMissionsReqItem);
  missions.destroy();
  mainWindow = null;
};

app.dock.hide();

app.on('window-all-closed', function() {
  if ( process.platform != 'darwin' ) app.quit();
});

app.on('ready', function() {
  appIcon = new Tray('./src/images/icon-tray-default@4x.png');
  appIcon.setPressedImage('./src/images/icon-tray-highlight@4x.png');

  mainWindow = new BrowserWindow({
    width: 570,
    height: 750,
    minWidth: 500,
    minHeight: 700,
    frame: false,
    show: false
  });

  missions = new Bargain({
    identifier: 'missions',
    sender: mainWindow.webContents
  });

  if ( process.env && process.env.NODE_ENV == 'development' ) {
    mainWindow.loadURL('http://localhost:8081');
  } else {
    mainWindow.loadURL('file://' + __dirname + '/dist/index.html');
  }

  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', closeMainWindow);
  appIcon.on('click', toggleApp);
  ipcMain.on('missions:req:itemslist', onMissionsReqItemsList);
  ipcMain.on('missions:req:item', onMissionsReqItem);
});


