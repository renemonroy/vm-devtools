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
  sceneMode: 0,
  missionsNames: ["invite_fried_sms", "line_picker", "megafan_roulette", "social_connect", "trivia", "user_picker", "view_media", "zip_code_collect"],
  activeMission: {
    name: 'view_media',
    identifier: 'com.virginmegausa.mission.view-media',
    screens: ['MissionSetup', 'MissionInProgress', 'MissionSuccess'],
    initialState: {
      maxJumps: 0,
      played: 0
    },
    missionEvents: ['MISSION_RESOLVE_SUCCESS']
  }
});

// ["invite_fried_sms", "line_picker", "megafan_roulette", "social_connect", "trivia", "user_picker", "view_media", "zip_code_collect"]

// Mission State
// -1 = Loading
// 0 = Reading
// 1 = Adding
// 2 = Editing
// 3 = Deleting