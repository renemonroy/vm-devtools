import { fromJS, List } from 'immutable';
import { Mission as Action } from '../constants/ActionTypes';
import { Mission as InitialState } from '../constants/InitialStates';

/** Pure Functions
 *----------------------------------------------------------------------------*/
function onMissionsListLoad(state) {
  return state.setIn(['missionsList', 'status'], 0);
};

function onMissionsListUpdate(state, list) {
  return state
    .setIn(['missionsList', 'status'], 1)
    .updateIn(['missionsList', 'data'], (data) =>
      data.clear().merge(fromJS(list))
    );
};

function onActiveMissionLoad(state) {
  return state.setIn(['activeMission', 'status'], 0);
};

function onActiveMissionUpdate(state, payload) {
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
    case Action.LOAD_MISSIONS_LIST :
      return onMissionsListLoad(state);
    case Action.UPDATE_MISSIONS_LIST :
      return onMissionsListUpdate(state, action.list);
    case Action.LOAD_ACTIVE_MISSION :
      return onActiveMissionLoad(state);
    case Action.UPDATE_ACTIVE_MISSION :
      return onActiveMissionUpdate(state, action.data);
    default :
      return state;
  }
};