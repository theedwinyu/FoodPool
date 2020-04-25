import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './components/LoginPage';
import RestaurantSelect from './components/RestaurantSelect';
import SignupPage from './components/SignupPage';

import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const store = createStore(
  reducers,
  // applyMiddleware(logger, ReduxPromise),
  applyMiddleware(ReduxPromise),
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/select-location" component={RestaurantSelect} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
