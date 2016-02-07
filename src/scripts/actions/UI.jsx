import { UI as Action } from '../constants/ActionTypes.jsx';

export function toggleSidebar() {
  return {
    type : Action.TOGGLE_SIDEBAR
  };
};