import { fromJS } from 'immutable';

/** Initial state for UI Store
 *----------------------------------------------------------------------------*/
export const UI = fromJS({
  showSidebar: true,
  sidebarWidth: 68,
  disableSidebarAnimation: true
});

/** Initial state for Mission Scene
 *----------------------------------------------------------------------------*/
export const Mission = fromJS({
  missionsList: {
    status: -1,
    data: []
  },
  activeMission: {
    status: -1,
    data: {
      name: 'view_media',
      identifier: 'com.virginmegausa.mission.view-media',
      screens: ['MissionSetup', 'MissionInProgress', 'MissionSuccess'],
      initialState: {
        maxJumps: 0,
        played: 0
      },
      missionEvents: ['MISSION_RESOLVE_SUCCESS']
    }
  }
});

// Status Meaning
// -1 = Unstarted
// 0 = Busy
// 1 = Ready