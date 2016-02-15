import _ from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import CombinedReducers from '../reducers';
import startSagas from '../sagas';
import { MissionActions } from '../actions';

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware(startSagas);
  const loggerMiddleware = createLogger();
  const middlewares = applyMiddleware(sagaMiddleware, loggerMiddleware);
  const appStore = createStore(CombinedReducers, middlewares);

  /** IPC Renderer Communication
   *--------------------------------------------------------------------------*/
  const onMissionsList = (e, payload) => {
    const newData = payload.data;
    const currData = appStore.getState().Mission.toJS().missionsList.data;
    if (!_.isEqual(newData, currData)) {
      appStore.dispatch(MissionActions.receiveMissionsListData(newData));
    }
  };

  const onMissionItem = (e, payload) => {
    let currentMission = null;
    switch (payload.type) {
      case 'res':
        appStore.dispatch(MissionActions.receiveActiveMissionData(payload.data));
        break;
      case 'change':
        currentMission = appStore.getState().Mission.toJS().activeMission;
        if (payload.name === currentMission.data.name) {
          appStore.dispatch(MissionActions.receiveActiveMissionData(payload.data));
        }
        break;
      default :
        throw new Error('>>> Event not defined.');
    }
  };

  ipcRenderer.on('missions:itemslist', onMissionsList);
  ipcRenderer.on('missions:item', onMissionItem);

  return appStore;
}
