import { fork, take, put } from 'redux-saga/effects';
import { Mission as ActionType } from '../constants/ActionTypes';
import { MissionActions as Action } from '../actions';
const { ipcRenderer } = require('electron');

/** Mission Sagas
 *----------------------------------------------------------------------------*/

/* Missions List */

function* fetchMissionsListData() {
  while (true) {
    yield take(ActionType.FETCH_MISSIONS_LIST_DATA);
    try {
      ipcRenderer.send('missions:itemslist');
      yield put(Action.changeMissionsListStatus(0));
    } catch (e) {
      yield put(Action.changeMissionsListStatus(-1));
      throw new Error(e);
    }
  }
}

function* receiveMissionsListData(getState) {
  while (true) {
    const { data: newData } = yield take(ActionType.RECEIVE_MISSIONS_LIST_DATA);
    yield put(Action.changeMissionsListData(newData));
    yield put(Action.changeMissionsListStatus(1));
    const currActiveMD = getState().Mission.ActiveMission.getIn(['data']).toJS();
    if (newData.length === 0 || newData.indexOf(currActiveMD.name) === -1) {
      yield put(Action.cleanActiveMissionData());
      yield put(Action.changeActiveMissionStatus(0));
    }
  }
}

/* Active Mission */

function* fetchActiveMissionData(getState) {
  while (true) {
    const { name } = yield take(ActionType.FETCH_ACTIVE_MISSION_DATA);
    const currName = getState().Mission.ActiveMission.getIn(['data', 'name']);
    if (name !== currName) {
      try {
        ipcRenderer.send('missions:item', name);
        yield put(Action.changeActiveMissionStatus(0));
      } catch (e) {
        yield put(Action.changeActiveMissionStatus(-1));
        throw new Error(e);
      }
    }
  }
}

function* receiveActiveMissionData(getState) {
  while (true) {
    const { data: newData } = yield take(ActionType.RECEIVE_ACTIVE_MISSION_DATA);
    const currentData = getState().Mission.ActiveMission.getIn(['data']).toJS();
    if (newData.name !== currentData.name) {
      yield put(Action.changeActiveMissionData(newData));
    }
    yield put(Action.changeActiveMissionStatus(1));
  }
}

/* Commands */

function* setMission() {
  while (true) {
    const { eventName, e } = yield take(ActionType.SET_MISSION);
    try {
      ipcRenderer.send(`missions:item:${eventName}`, e);
    } catch (err) {
      throw new Error(err);
    }
  }
}

function* openInApp() {
  while (true) {
    const { appName, pathName } = yield take(ActionType.OPEN_IN_APP);
    try {
      switch (appName) {
        case 'terminal':
          ipcRenderer.send('openterminal', pathName);
          break;
        case 'finder':
          ipcRenderer.send('openfinder', pathName);
          break;
        default: break;
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}

/** Initial state for Mission Scene
 *----------------------------------------------------------------------------*/

export default function* MissionSaga(getState) {
  yield fork(fetchMissionsListData);
  yield fork(receiveMissionsListData, getState);
  yield fork(fetchActiveMissionData, getState);
  yield fork(receiveActiveMissionData, getState);
  yield fork(setMission);
  yield fork(openInApp);
}
