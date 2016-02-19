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

// Active Mission
// {
//   "name": "view_media",
//   "identifier": "com.virginmegausa.mission.view-media",
//   "screens": [
//     {
//       "name": "MissionSetup",
//       "type": "stateless"
//     },
//     {
//       "name": "MissionInProgress",
//       "type": "stateful"
//     },
//     {
//       "name": "MissionSuccess",
//       "type": "stateless"
//     }
//   ],
//   "properties": [
//     {
//       "name": "screen",
//       "type": "string",
//       "value": "MissionSetup"
//     },
//     {
//       "name": "played",
//       "type": "number",
//       "value": 0
//     },
//     {
//       "name": "maxJumps",
//       "type": "number",
//       "value": 0
//     },
//     {
//       "name": "earnedJumps",
//       "type": "number",
//       "value": 0
//     },
//     {
//       "name": "intro",
//       "type": "string",
//       "value": ""
//     }
//   ]
// }
