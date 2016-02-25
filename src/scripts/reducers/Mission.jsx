import { combineReducers } from 'redux';
import { fromJS } from 'immutable';
import { Mission as Action } from '../constants/ActionTypes';
import { Mission as InitialState } from '../constants/InitialStates';
const missionsListState = InitialState.get('missionsList');
const activeMissionState = InitialState.get('activeMission');

/** Pure Functions
 *---------------------------------------------------------------------*/

/* Missions List */

function onChangeMissionsListData(state, newData) {
  return state.updateIn(['data'], (currData) =>
    currData.clear().merge(fromJS(newData))
  );
}

function onChangeMissionsListStatus(state, status) {
  return state.set('status', status);
}

/* Active Mission */

function onChangeActiveMissionData(state, newData) {
  return state.updateIn(['data'], (currData) =>
    currData.merge(fromJS(newData))
  );
}

function onChangeActiveMissionStatus(state, status) {
  return state.set('status', status);
}

function onCleanActiveMissionData(state) {
  return state.updateIn(['data'], (currData) =>
    currData.clear()
  );
}

/** Reducers
 *---------------------------------------------------------------------*/

function MissionsList(state = missionsListState, action) {
  switch (action.type) {
    case Action.CHANGE_MISSIONS_LIST_DATA:
      return onChangeMissionsListData(state, action.data);
    case Action.CHANGE_MISSIONS_LIST_STATUS:
      return onChangeMissionsListStatus(state, action.status);
    default:
      return state;
  }
}

function ActiveMission(state = activeMissionState, action) {
  switch (action.type) {
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

export default combineReducers({ MissionsList, ActiveMission });
