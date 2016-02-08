'use strict';

var electron = require('electron');
var fs = require('fs-plus');
var chokidar = require('chokidar');
var path = require('path');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var Tray = electron.Tray;
var missionsPath = './missions/';
var missionsFilesToWatch = './missions/**/mission.json';
var ipcMain = electron.ipcMain;

var mainWindow = null;
var appIcon = null;
var missionsWatcher = null;

var toggleApp = function(e) {
  if ( mainWindow.isFocused() ) {
    mainWindow.hide();
  } else {
    mainWindow.show();
  }
};

var closeMainWindow = function() {
  ipcMain.removeListener('missions:req:list', getMissionsList);
  ipcMain.removeListener('missions:req:mission', getMission);
  missionsWatcher.close();
  mainWindow = null;
};

var getMissionsList = function(callback) {
  fs.readdir(missionsPath, function(err, files) {
    if ( err ) throw err;
    callback( files.filter( function(fileName) {
      var mp = path.join(missionsPath, fileName);
      return fs.isDirectorySync(mp) && fs.existsSync(mp + '/mission.json');
    }));
  });
};

var updateRemoteMissionsList = function(callback) {
  getMissionsList( function(missionsList) {
    mainWindow.webContents.send('missions:res:list', missionsList);
    console.log('>>> [missions:res:list] =>', missionsList);
  });
};

var getMission = function(name, callback) {
  var mp = missionsPath + name + '/mission.json';
  fs.readFile(mp, 'utf8', function(err, missionData) {
    if ( err ) throw err;
    callback(JSON.parse(missionData));
  });
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

  missionsWatcher = chokidar.watch(missionsFilesToWatch, {
    ignored: /[\/\\]\./,
    depth: 2,
    persistent: true,
    ignoreInitial: true
  });

  if ( process.env && process.env.NODE_ENV == 'development' ) {
    mainWindow.loadURL('http://localhost:8081');
  } else {
    mainWindow.loadURL('file://' + __dirname + '/dist/index.html');
  }

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', closeMainWindow);
  appIcon.on('click', toggleApp);

  ipcMain.on('missions:req:list', function(e) {
    console.log('>>> [missions:req:list]');
    updateRemoteMissionsList();
  });

  ipcMain.on('missions:req:mission', function(e, name) {
    console.log('>>> [missions:req:mission] =>', name);
    getMission(name, function(mission) {
      e.sender.send('missions:res:mission', mission);
      console.log('>>> [missions:res:mission] =>', mission);
    });
  });

  missionsWatcher.on('add', function(missionPath) {
    console.log('>>> [add] =>', missionPath);
    updateRemoteMissionsList();
  });

  missionsWatcher.on('unlink', function(missionPath) {
    console.log('>>> [unlink] =>', missionPath);
    updateRemoteMissionsList();
  });

});


