import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import App from './components';
import * as Scenes from './components/scenes';
import configureStore from './utils/configureStore';

require('../styles/index.scss');
require('../images/window-icons-actions.png');
require('../images/vm-logo.png');
require('../images/banner-mission.jpg');

const electron = require('electron');
const currentWindow = electron.remote.getCurrentWindow();
const appStore = configureStore();

const routes = (
  <Route path="/" component={App}>
    <Route path="/missions" component={Scenes.MissionsScene} />
    <Route path="/labs" component={Scenes.LabsScene} />
    <IndexRedirect to="/missions" />
  </Route>
);

ReactDOM.render(
  <Provider store={appStore}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('app-wrapper')
);

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => currentWindow.show(), 0);
});
