import { Mission as Action } from '../constants/ActionTypes';

export function updateMissionsNames(names) {
  return { type: Action.UPDATE_MISSIONS_NAMES, names };
};

export function editActiveMission(data) {
  return { type: Action.EDIT_ACTIVE_MISSION, data };
};

// export function addMission(payload) {
//   return { type: Action.ADD_MISSION, payload };
// };
//
// export function editMission(identifier, payload) {
//   return { type: Action.EDIT_MISSION, identifier, payload };
// };
//
// export function deleteMission(identifier) {
//   return { type: Action.DELETE_MISSION, identifier };
// };