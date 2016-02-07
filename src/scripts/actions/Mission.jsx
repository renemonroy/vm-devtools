import { Mission as Action } from '../constants/ActionTypes';
let ipcRenderer = require('electron').ipcRenderer;

export function changeMissionsListStatus(status) {
  return { type : Action.CHANGE_MISSIONS_LIST_STATUS, status };
}

export function updateMissionsList(list) {
  return { type: Action.UPDATE_MISSIONS_LIST, list };
};

export function updateActiveMission(data) {
  return { type: Action.UPDATE_ACTIVE_MISSION, data };
};

export function getMissionsList() {
  return (dispatch) => {
    dispatch(changeMissionsListStatus(0));
    ipcRenderer.send('missions:req:list');
  };
};