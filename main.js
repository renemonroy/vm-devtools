'use strict';

var electron = require('electron');
var colors = require('colors/safe');
var Bargain = require('./bargain');
var config = require('./config');

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var Tray = electron.Tray;
var ipcMain = electron.ipcMain;

var mainWindow = null;
var appIcon = null;
var missions = null;
var mainSrc = process.env && process.env.NODE_ENV == 'development' ?
  'http://localhost:8081' : 'file://' + __dirname + '/dist/index.html';

var evLog = function(str) { return colors.green(str); };

var toggleApp = function(e) {
  mainWindow.isFocused() ? mainWindow.hide() : mainWindow.hide();
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
  missions.end();
  mainWindow = null;
};

app.dock.hide();

app.on('window-all-closed', function() {
  if ( process.platform != 'darwin' ) app.quit();
});

app.on('ready', function() {
  var missionsBargain = config.missionsBargain;

  appIcon = new Tray(config.trayIcon);
  mainWindow = new BrowserWindow(config.mainWindow);
  missions = new Bargain(missionsBargain, mainWindow.webContents);

  appIcon.setPressedImage('./src/images/icon-tray-highlight@4x.png');
  appIcon.on('click', toggleApp);

  mainWindow.loadURL(mainSrc);
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', closeMainWindow);

  ipcMain.on('missions:req:itemslist', onMissionsReqItemsList);
  ipcMain.on('missions:req:item', onMissionsReqItem);
});


