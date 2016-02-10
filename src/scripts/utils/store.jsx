import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import CombinedReducers from '../reducers';
import { MissionsActions } from '../actions';

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const remote = electron.remote;
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const appStore = createStoreWithMiddleware(CombinedReducers);

ipRenderer.on('missions:res:itemslist', (e, list) => {
  appStore.dispatch(MissionsActions.updateMissionsList(list));
});

ipRenderer.on('missions:res:item', (e, mission) => {
  var currentMission = appStore.getState().Mission.get('activeMission').toJS();
  if ( mission.name == currentMission.data.name ) {
    appStore.dispatch(MissionsActions.updateActiveMission(mission));
  }
});

export default appStore;