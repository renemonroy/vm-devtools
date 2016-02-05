import { fromJS, List } from 'immutable';
import { Mission as Action } from '../constants/ActionTypes';
import { Mission as InitialState } from '../constants/InitialStates';

/** Pure Functions
 *----------------------------------------------------------------------------*/
// function addMission(state, data) {
//   return state.update('missions', (missions) =>
//     missions.push(fromJS({ [data.identifier] : data }))
//   );
// };

function updateMissionsNames(state, names) {
  return state
    .set('missionsNames', fromJS(names));
};

function editActiveMission(state, data) {
  return state
    .set('sceneMode', 1)
    .updateIn('activeMission', (m) => m.merge( fromJS(data) ));
};

// function deleteMission(state, identifier) {
//   return state.deleteIn(['missions', identifier]);
// };

/** Reducer
 *----------------------------------------------------------------------------*/
export default function MissionStore(state = InitialState, action) {
  switch ( action.type ) {
    case Action.UPDATE_MISSIONS_NAMES :
      return updateMissionsNames(state, action.names);
    case Action.EDIT_ACTIVE_MISSION :
      return editActiveMission(state, action.data);
  }
  return state;
};