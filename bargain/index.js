'use strict';

var colors = require('colors/safe');
var fs = require('fs-plus');
var path = require('path');
var chokidar = require('chokidar');

var evLog = function(str) { return colors.green(str); };

var bargain = function() {
  this.init.apply(this, arguments);
};

bargain.prototype = {

  constructor: bargain,
  path: null,
  identifier: 'packs',
  watcher: null,
  sender: null,

  init: function(config, sender) {
    for (var prop in config) {
      this[prop] = config[prop];
    }
    if ( this.path == null ) this.path = './bargain/' + this.identifier + '/';
    if ( sender ) this.sender = sender;
    this.watch();
  },

  watch: function(callback) {
    var _self = this,
      filesToWatch = this.path + '**/config.json';
    this.watcher = chokidar.watch(filesToWatch, {
      ignored: /[\/\\]\./,
      ignoreInitial: true,
      depth: 2,
      persitent: true
    });
    this.watcher.on('add', function(packPath) {
      console.log('>>> [' + evLog('add') + '] =>', packPath);
      _self.updateRemoteItemsList();
    });
    this.watcher.on('unlink', function(packPath) {
      console.log('>>> [' + evLog('unlink') + '] =>', packPath);
      _self.updateRemoteItemsList();
    });
  },

  get: function(name, callback) {
    var packsPath = this.path + name + '/config.json';
    fs.readFile(packsPath, 'utf8', function(err, packData) {
      if (err) throw err;
      callback(JSON.parse(packData));
    });
  },

  getList: function(callback) {
    var packsPath = this.path;
    fs.readdir(packsPath, function(err, files) {
      if (err) throw err;
      callback( files.filter( function(fileName) {
        var mp = path.join(packsPath, fileName);
        return fs.isDirectorySync(mp) && fs.existsSync(mp + '/config.json');
      }));
    });
  },

  updateRemoteItemsList: function() {
    var _self = this;
    this.getList( function(packsList) {
      var eventName = _self.identifier + ':res:itemslist';
      _self.sender.send(eventName, packsList);
      console.log('>>> [' + evLog(eventName) + '] =>', packsList);
    });
  },

  updateRemoteItem: function(name) {
    var _self = this;
    this.get(name, function(data) {
      var eventName = _self.identifier + ':res:item';
      _self.sender.send(eventName, data);
      console.log('>>> [' + evLog(eventName) + '] =>', data);
    });
  },

  end: function() {
    this.watcher.close();
    this.path = null;
    this.identifier = null;
  }

};

module.exports = bargain;