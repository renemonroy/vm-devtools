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

var watch = function() {
  var filesToWatch = this.path + '**/config.json';
  this.watcher = chokidar.watch(filesToWatch, this.watcherConfig);
  this.watcher.on('add', onItemAdded.bind(this));
  this.watcher.on('change', onItemChanged.bind(this));
  this.watcher.on('unlink', onItemUnlinked.bind(this));
};

var handleItemEvent = function(eventName, itemPath) {
  this.validateItem(itemPath, function(err, itemData) {
    if ( !err ) {
      this.updateRemoteItemsList();
      this.sender.send(this.identifier + ':item', {
        type: eventName,
        data: itemData
      });
    }
  }.bind(this));
};

var onItemAdded = function(itemPath) {
  handleItemEvent.apply(this, ['add', itemPath]);
};

var onItemChanged = function(itemPath) {
  handleItemEvent.apply(this, ['change', itemPath]);
};

var onItemUnlinked = function(itemPath) {
  this.updateRemoteItemsList();
};

bargain.prototype = {

  constructor: bargain,
  path: null,
  identifier: 'packs',
  watcher: null,
  sender: null,
  watcherConfig : {
    ignored: /[\/\\]\./,
    ignoreInitial: true,
    depth: 2,
    persitent: true
  },

  init: function(config, sender) {
    for (var prop in config) {
      this[prop] = config[prop];
    }
    if ( this.path == null ) this.path = './bargain/' + this.identifier + '/';
    if ( sender ) this.sender = sender;
    watch.apply(this);
  },

  _emmitItemsList: function(obj) {
    this.getItemsList( function(itemsList) {
      obj.data = itemsList;
      console.log('>>> Items List:', obj);
      this.sender.send(this.identifier + ':itemslist', obj);
    }.bind(this));
  },

  _emmitItem: function(obj) {
    this.getItem(obj.name, function(data) {
      obj.data = data;
      console.log('>>> Item:', obj);
      this.sender.send(this.identifier + ':item', obj);
    }.bind(this));
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

  respondItemsList: function() {
    console.log('>>> responding items list...');
    this._emmitItemsList({ type: 'res' });
  },

  updateRemoteItemsList: function() {
    this._emmitItemsList({ type: 'update' });
  },

  respondItem: function(name) {
    console.log('>>> responding item...');
    this._emmitItem({ type: 'res', name: name });
  },

  end: function() {
    this.watcher.close();
    this.path = null;
    this.identifier = null;
  }

};

module.exports = bargain;