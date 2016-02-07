'use strict';

var electron = require('electron');
var fs = require('fs-plus');
var path = require('path');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var Tray = electron.Tray;
var missionsPath = './missions/';
var ipcMain = electron.ipcMain;

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
    minHeight : 700,
    frame : false,
    show : false
  });

  if ( process.env && process.env.NODE_ENV == 'development' ) {
    mainWindow.loadURL('http://localhost:8081');
  } else {
    mainWindow.loadURL('file://' + __dirname + '/dist/index.html');
  }

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    ipcMain.removeListener('missions:req:list', getMissionsList);
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

/* MISSIONS
 *--------------------------------------------------------------------------- */
var getMissionsList = function(e) {
  fs.readdir(missionsPath, function(err, files) {
    var missionsList = [];
    if ( err ) throw err;
    files.forEach( function(fileName) {
      var mp = path.join(missionsPath, fileName);
      if ( fs.isDirectorySync(mp) && fs.existsSync(mp + '/mission.json') ) {
        missionsList.push(fileName);
      }
    });
    e.sender.send('missions:res:list', missionsList);
  });
};

ipcMain.on('missions:req:list', getMissionsList);

