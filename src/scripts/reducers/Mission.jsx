import { fromJS } from 'immutable';
import { Mission as Action } from '../constants/ActionTypes';
import { Mission as InitialState } from '../constants/InitialStates';

/** Pure Functions
 *---------------------------------------------------------------------*/

/* Missions List */

function onChangeMissionsListData(state, newData) {
  return state.updateIn(['missionsList', 'data'], (currData) =>
    currData.clear().merge(fromJS(newData))
  );
}

function onChangeMissionsListStatus(state, status) {
  return state.setIn(['missionsList', 'status'], status);
}

/* Active Mission */

function onChangeActiveMissionData(state, newData) {
  return state.updateIn(['activeMission', 'data'], (currData) =>
    currData.merge(fromJS(newData))
  );
}

function onChangeActiveMissionStatus(state, status) {
  return state.setIn(['activeMission', 'status'], status);
}

function onCleanActiveMissionData(state) {
  return state.updateIn(['activeMission', 'data'], (currData) =>
    currData.clear()
  );
}

/** Reducer
 *---------------------------------------------------------------------*/

export default function MissionReducer(state = InitialState, action) {
  switch (action.type) {
    case Action.CHANGE_MISSIONS_LIST_DATA:
      return onChangeMissionsListData(state, action.data);
    case Action.CHANGE_MISSIONS_LIST_STATUS:
      return onChangeMissionsListStatus(state, action.status);
    case Action.CHANGE_ACTIVE_MISSION_DATA:
      return onChangeActiveMissionData(state, action.data);
    case Action.CHANGE_ACTIVE_MISSION_STATUS:
      return onChangeActiveMissionStatus(state, action.status);
    case Action.CLEAN_ACTIVE_MISSION_DATA:
      return onCleanActiveMissionData(state);
    default:
      return state;
  }
}
