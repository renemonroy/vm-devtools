import { fromJS } from 'immutable';

/** UI Initial State
 *----------------------------------------------------------------------------*/
export const UI = fromJS({
  showSidebar: true,
  sidebarWidth: 68,
  disableSidebarAnimation: true
});

/** Missions Initial State
 *----------------------------------------------------------------------------*/
export const Mission = fromJS({
  missions : {
    'com.virginmegausa.mission.view-media' : {
      name: 'View Media',
      identifier: 'com.virginmegausa.mission.view-media',
      screens: ['MissionSetup', 'MissionInProgress', 'MissionSuccess'],
      initialState: {
        maxJumps : 0,
        played : 0
      },
      missionStore: {
        listening: true,
        events: ['MISSION_RESOLVE_SUCCESS']
      }
    }
  }
});