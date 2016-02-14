import { fromJS } from 'immutable';

/** Initial state for UI Store
 *----------------------------------------------------------------------------*/
export const UI = fromJS({
  showSidebar: true,
  sidebarWidth: 68,
  disableSidebarAnimation: true,
});

/** Initial state for Mission Scene
 *----------------------------------------------------------------------------*/
export const Mission = fromJS({
  missionsList: {
    status: 0,
    data: [],
  },
  activeMission: {
    status: 0,
    data: {},
  },
});

// Status Meaning
// -1 = Error
// 0 = Unstarted
// 1 = Busy
// 2 = Ready


// name: 'view_media',
// identifier: 'com.virginmegausa.mission.view-media',
// screens: ['MissionSetup', 'MissionInProgress', 'MissionSuccess'],
// initialState: {
//   maxJumps: 0,
//   played: 0
// },
// missionEvents: ['MISSION_RESOLVE_SUCCESS']
