import { UI as Action } from '../constants/ActionTypes';
import { UI as InitialState } from '../constants/InitialStates';

/** Pure Functions
 *----------------------------------------------------------------------------*/
function toggleSidebar(state) {
  return state.set('showSidebar', !state.get('showSidebar'));
}

/** Reducer
 *----------------------------------------------------------------------------*/
export default function UIReducer(state = InitialState, action) {
  switch (action.type) {
    case Action.TOGGLE_SIDEBAR :
      return toggleSidebar(state);
    default :
      return state;
  }
}
