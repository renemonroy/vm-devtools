import { Mission as Action } from '../constants/ActionTypes';
let ipcRenderer = require('electron').ipcRenderer;

export function getMissionsList() {
  return (dispatch) => {
    dispatch({ type: Action.GET_MISSIONS_LIST, status: 0 });
    ipcRenderer.send('missions:req:list');
  };
};

export function updateMissionsList(list) {
  return { type: Action.UPDATE_MISSIONS_LIST, list };
};

export function updateActiveMission(data) {
  return { type: Action.UPDATE_ACTIVE_MISSION, data };
};