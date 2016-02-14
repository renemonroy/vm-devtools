import { fork, take, put } from 'redux-saga';
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

function* receiveMissionsListData() {
  while (true) {
    const { data: newData } = yield take(ActionType.RECEIVE_MISSIONS_LIST_DATA);
    yield put(Action.changeMissionsListData(newData));
    yield put(Action.changeMissionsListStatus(1));
  }
}

/* Active Mission */

function* fetchActiveMissionData(getState) {
  while (true) {
    const { name } = yield take(ActionType.FETCH_ACTIVE_MISSION_DATA);
    const currName = getState().Mission.getIn(['activeMission', 'data', 'name']);
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
    const currentData = getState().Mission.toJS().activeMission.data;
    if (newData.name !== currentData.name) {
      yield put(Action.changeActiveMissionData(newData));
    }
    yield put(Action.changeActiveMissionStatus(1));
  }
}

/** Initial state for Mission Scene
 *----------------------------------------------------------------------------*/

export default function* MissionSaga(getState) {
  yield fork(fetchMissionsListData);
  yield fork(receiveMissionsListData);
  yield fork(fetchActiveMissionData, getState);
  yield fork(receiveActiveMissionData, getState);
}
