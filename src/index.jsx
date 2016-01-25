import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import CombinedReducers from './reducers';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from './components';
import * as Scenes from './components/scenes';

require('./index.scss');

const appStore = createStore(CombinedReducers);
const history = createBrowserHistory();
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Scenes.MissionScene} />
    <Route path="/labs" component={Scenes.LabsScene} />
  </Route>
);

ReactDOM.render(
  <Provider store={appStore}>
    <Router  history={history} routes={routes} />
  </Provider>,
  document.getElementById('app-wrapper')
);