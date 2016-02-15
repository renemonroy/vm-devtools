import { Mission as ActionType } from '../constants/ActionTypes';

/* Missions List */

export const fetchMissionsList = () =>
  ({ type: ActionType.FETCH_MISSIONS_LIST_DATA });

export const receiveMissionsListData = (data) =>
  ({ type: ActionType.RECEIVE_MISSIONS_LIST_DATA, data });

export const changeMissionsListData = (data) =>
  ({ type: ActionType.CHANGE_MISSIONS_LIST_DATA, data });

export const changeMissionsListStatus = (status) =>
  ({ type: ActionType.CHANGE_MISSIONS_LIST_STATUS, status });

/* Active Mission */

export const fetchActiveMissionData = (name) =>
  ({ type: ActionType.FETCH_ACTIVE_MISSION_DATA, name });

export const receiveActiveMissionData = (data) =>
  ({ type: ActionType.RECEIVE_ACTIVE_MISSION_DATA, data });

export const changeActiveMissionData = (data) =>
  ({ type: ActionType.CHANGE_ACTIVE_MISSION_DATA, data });

export const changeActiveMissionStatus = (status) =>
  ({ type: ActionType.CHANGE_ACTIVE_MISSION_STATUS, status });


/* Others */

export const deleteMission = (name) =>
  ({ type: ActionType.DELETE_MISSION, name });

export const openInApp = (appName, pathName) =>
  ({ type: ActionType.OPEN_IN_APP, appName, pathName });
