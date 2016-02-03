import { Mission as Action } from '../constants/ActionTypes';

export function addMission(payload) {
  return { type: Action.ADD_MISSION, payload };
};

export function editMission(identifier, payload) {
  return { type: Action.EDIT_MISSION, identifier, payload };
};

export function deleteMission(identifier) {
  return { type: Action.DELETE_MISSION, identifier };
};