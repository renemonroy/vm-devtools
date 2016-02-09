'use strict';

var colors = require('colors/safe');
var fs = require('fs-plus');
var path = require('path');
var chokidar = require('chokidar');

var evLog = function(str) { return colors.green(str); };
var warnLog = function(str) { return colors.yellow(str); };

var bargain = function() {
  this.init.apply(this, arguments);
};

var onItemAdded = function(itemPath) {
  console.log('>>> [' + evLog('add') + '] =>', itemPath);
  this.validateItem(itemPath, function(err, itemData) {
    if ( !err ) this.updateRemoteItemsList();
  }.bind(this));
};

var onItemChanged = function(itemPath) {
  console.log('>>> [' + evLog('change') + '] =>', itemPath);
  this.validateItem(itemPath, function(err, itemData) {
    if ( !err ) this.updateRemoteItemsList();
  }.bind(this));
};

var onItemUnlinked = function(itemPath) {
  console.log('>>> [' + evLog('unlink') + '] =>', itemPath);
  this.updateRemoteItemsList();
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
    var filesToWatch = this.path + '**/config.json';
    this.watcher = chokidar.watch(filesToWatch, {
      ignored: /[\/\\]\./,
      ignoreInitial: true,
      depth: 2,
      persitent: true
    });
    this.watcher.on('add', onItemAdded.bind(this));
    this.watcher.on('change', onItemChanged.bind(this));
    this.watcher.on('unlink', onItemUnlinked.bind(this));
  },

  getItem: function(name, callback) {
    var itemPath = this.path + name + '/config.json';
    this.validateItem(itemPath, function(err, itemData) {
      if ( !err ) callback(itemData);
    }.bind(this));
  },

  validateItem: function(itemPath, callback) {
    fs.readFile(itemPath, 'utf8', function(err, itemData) {
      var data = null;
      if (err) throw err;
      try {
        data = JSON.parse(itemData);
        callback(null, data);
      } catch(e) {
        data = { error: 'Not valid JSON.' };
        console.log('>>>', warnLog(data.error))
        callback(data);
      }
    });
  },

  getItemsList: function(callback) {
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
    this.getItemsList( function(packsList) {
      var eventName = this.identifier + ':res:itemslist';
      this.sender.send(eventName, packsList);
      console.log('>>> [' + evLog(eventName) + '] =>', packsList);
    }.bind(this));
  },

  updateRemoteItem: function(name) {
    this.getItem(name, function(data) {
      var eventName = this.identifier + ':res:item';
      this.sender.send(eventName, data);
      console.log('>>> [' + evLog(eventName) + '] =>', data);
    }.bind(this));
  },

  end: function() {
    this.watcher.close();
    this.path = null;
    this.identifier = null;
  }

};

module.exports = bargain;