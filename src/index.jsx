import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import CombinedReducers from './reducers';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import App from './components';
import * as Scenes from './components/scenes';
import * as missionActions from './actions/Mission';

require('./index.scss');
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const remote = electron.remote;
const currentWindow = remote.getCurrentWindow();
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const appStore = createStoreWithMiddleware(CombinedReducers);

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="/missions" />
    <Route path="/missions" component={Scenes.MissionsScene} />
    <Route path="/labs" component={Scenes.LabsScene} />
  </Route>
);

const handleMissionsList = (e, list) => {
  appStore.dispatch(missionActions.updateMissionsList(list));
};

ipcRenderer.on('missions:res:list', handleMissionsList);

ReactDOM.render(
  <Provider store={appStore}>
    <Router  history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app-wrapper')
);

document.addEventListener('DOMContentLoaded', e => {
  setTimeout(() => currentWindow.show(), 0);
});