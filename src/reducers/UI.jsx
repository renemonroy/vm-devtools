import { UI } from '../constants/ActionTypes';
import * as initialState from '../constants/InitialStates';

/** Pure Functions
 *----------------------------------------------------------------------------*/
function toggleSidebar(state) {
  return state.set('showSidebar', !state.get('showSidebar'));
};

/** Reducer
 *----------------------------------------------------------------------------*/
export default function UIReducer(state = initialState.UI, action) {
  switch ( action.type ) {
    case UI.TOGGLE_SIDEBAR :
      return toggleSidebar(state);
  }
  return state;
};