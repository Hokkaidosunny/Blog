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
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas/index.js';
import App from './containers/App.js';
global.isDev = process.env.NODE_ENV == 'dev';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
//use chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let enhancers;
if (global.isDev) {
  enhancers = [
    applyMiddleware(
      thunk,
      sagaMiddleware,
      createLogger({ duration: true, diff: true}),
      routerMiddleware(history)
    )
  ];
} else {
  enhancers = [
    applyMiddleware(
      thunk,
      createSagaMiddleware(),
      routerMiddleware(history)
    )
  ];
}

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  composeEnhancers(...enhancers)
);

//run sagas
for (const key in sagas) {
  sagaMiddleware.run(sagas[key]);
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path='/' component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
