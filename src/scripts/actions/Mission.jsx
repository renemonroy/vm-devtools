import { Mission as Action } from '../constants/ActionTypes';
let ipcRenderer = require('electron').ipcRenderer;

// MISSIONS LIST

export function loadMissionsList() {
  return (dispatch) => {
    dispatch({ type: Action.LOAD_MISSIONS_LIST });
    ipcRenderer.send('missions:itemslist');
  };
};

export function updateMissionsList(list) {
  return { type: Action.UPDATE_MISSIONS_LIST, list };
};


// ACTIVE MISSION

export function loadActiveMission(name) {
  return (dispatch) => {
    dispatch({ type: Action.LOAD_ACTIVE_MISSION });
    ipcRenderer.send('missions:item', name);
  };
};

export function updateActiveMission(data) {
  return { type: Action.UPDATE_ACTIVE_MISSION, data };
};