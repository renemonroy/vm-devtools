import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CombinedReducers from './reducers';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import App from './components';
import * as Scenes from './components/scenes';
import appStore from './utils/store';

require('../styles/index.scss');
require('../images/window-icons-actions.png');
require('../images/vm-logo.png');

const electron = require('electron');
const currentWindow = electron.remote.getCurrentWindow();

const routes = (
  <Route path="/" component={App}>
    <Route path="/missions" component={Scenes.MissionsScene} />
    <Route path="/labs" component={Scenes.LabsScene} />
    <IndexRedirect to="/missions"/>
  </Route>
);

ReactDOM.render(
  <Provider store={appStore}>
    <Router  history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('app-wrapper')
);

document.addEventListener('DOMContentLoaded', e => {
  setTimeout(() => currentWindow.show(), 0);
});