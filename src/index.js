require('es6-promise').polyfill();
require('fastclick').attach(document.body);
require('whatwg-fetch');  //fetch
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import {Route} from 'react-router';
import createHistory from 'history/createHashHistory';
import {createLogger} from 'redux-logger';
import reducers from './reducers/index.js';
import App from './containers/App.js';
global.isDev = process.env.NODE_ENV == 'dev';
console.log(isDev);
if (isDev) {
  require('./Mock/index.js');
}

const history = createHistory();

//use chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let enhancers;
if (isDev) {
  enhancers = [applyMiddleware(thunk, createLogger({
    duration: true,
    diff: true
  }), routerMiddleware(history))];
} else {
  enhancers = [applyMiddleware(thunk, routerMiddleware(history))];
}

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  composeEnhancers(...enhancers)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path='/' component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
