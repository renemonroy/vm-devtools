import { fromJS, List } from 'immutable';
import { Mission as Action } from '../constants/ActionTypes';
import { Mission as InitialState } from '../constants/InitialStates';

/** Pure Functions
 *----------------------------------------------------------------------------*/
function getMissionsList(state, status) {
  return state.setIn(['missionsList', 'status'], status);
};

function updateMissionsList(state, list) {
  return state
    .setIn(['missionsList', 'status'], 1)
    .updateIn(['missionsList', 'data'], (data) =>
      data.clear().merge(fromJS(list))
    );
};

function updateActiveMission(state, payload) {
  return state
    .setIn(['activeMission', 'status'], 1)
    .updateIn(['activeMission', 'data'], (data) =>
      data.merge(fromJS(payload))
    );
};

/** Reducer
 *----------------------------------------------------------------------------*/
export default function MissionStore(state = InitialState, action) {
  switch ( action.type ) {
    case Action.GET_MISSIONS_LIST :
      return getMissionsList(state, action.status);
    case Action.UPDATE_MISSIONS_LIST :
      return updateMissionsList(state, action.list);
    case Action.UPDATE_ACTIVE_MISSION :
      return updateActiveMission(state, action.data);
    default :
      return state;
  }
};