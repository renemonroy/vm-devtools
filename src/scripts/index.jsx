import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CombinedReducers from './reducers';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import App from './components';
import * as Scenes from './components/scenes';
import appStore from './utils/store';

require('../styles/index.scss');
require('../images/window-icons-actions.png');
require('../images/vm-logo.png');

const currentWindow = remote.getCurrentWindow();

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="/missions" />
    <Route path="/missions" component={Scenes.MissionsScene} />
    <Route path="/labs" component={Scenes.LabsScene} />
  </Route>
);

ReactDOM.render(
  <Provider store={appStore}>
    <Router  history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app-wrapper')
);

document.addEventListener('DOMContentLoaded', e => {
  setTimeout(() => currentWindow.show(), 0);
});