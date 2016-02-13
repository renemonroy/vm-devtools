import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import CombinedReducers from '../reducers';
import { MissionActions } from '../actions';

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const appStore = createStoreWithMiddleware(CombinedReducers);


/** IPC Renderer Communication
 *----------------------------------------------------------------------------*/
const onMissionsList = (e, payload) => {
  appStore.dispatch(MissionActions.updateMissionsList(payload.data));
};

const onMissionItem = (e, payload) => {
  let currentMission = null;
  switch (payload.type) {
    case 'res':
      appStore.dispatch(MissionActions.updateActiveMission(payload.data));
      break;
    case 'change':
      currentMission = appStore.getState().Mission.get('activeMission').toJS();
      if (payload.data.name === currentMission.data.name) {
        appStore.dispatch(MissionActions.updateActiveMission(payload.data));
      }
      break;
    default :
      throw new Error('>>> Event not defined.');
  }
};

ipcRenderer.on('missions:itemslist', onMissionsList);
ipcRenderer.on('missions:item', onMissionItem);


/** Export AppStore
 *----------------------------------------------------------------------------*/
export default appStore;
