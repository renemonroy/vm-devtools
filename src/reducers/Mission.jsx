import { fromJS, List } from 'immutable';
import { Mission as Action } from '../constants/ActionTypes';
import { Mission as InitialState } from '../constants/InitialStates';

/** Pure Functions
 *----------------------------------------------------------------------------*/
function addMission(state, data) {
  return state.update('missions', (missions) =>
    missions.push(fromJS({ [data.identifier] : data }))
  );
};

function editMission(state, identifier, data) {
  return state.updateIn(['missions', identifier], (mission) =>
    mission.merge(fromJS(data))
  );
};

function deleteMission(state, identifier) {
  return state.deleteIn(['missions', identifier]);
};

/** Reducer
 *----------------------------------------------------------------------------*/
export default function MissionStore(state = InitialState, action) {
  switch ( action.type ) {
    case Action.ADD_MISSION :
      return addMission(state, action.payload);
    case Action.EDIT_MISSION :
      return editMission(state, action.identifier, action.payload);
    case Action.DELETE_MISSION :
      return deleteMission(state, action.identifier);
  }
  return state;
};