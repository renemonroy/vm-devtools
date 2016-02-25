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
    const currData = appStore.getState().Mission.MissionsList.toJS().data;
    if (!_.isEqual(newData, currData)) {
      appStore.dispatch(MissionActions.receiveMissionsListData(newData));
    }
  };

  const onMissionItem = (e, payload) => {
    const newData = payload.data;
    let currData = null;
    if (payload.type === 'res') {
      appStore.dispatch(MissionActions.receiveActiveMissionData(newData));
    } else {
      currData = appStore.getState().Mission.ActiveMission.toJS().data;
      if (newData.name === currData.name && !_.isEqual(newData, currData)) {
        appStore.dispatch(MissionActions.receiveActiveMissionData(newData));
      } else if (payload.type === 'change') {
        new Notification('Mission change succeeded', {
          body: `The mission ${newData.name} has been changed successfully.`,
          silent: true,
        });
      }
    }
  };

  ipcRenderer.on('missions:itemslist', onMissionsList);
  ipcRenderer.on('missions:item', onMissionItem);

  return appStore;
}
