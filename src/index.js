require('fastclick').attach(document.body);
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';  //use it for async action
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { Router, hashHistory } from 'react-router';
import reducers from './reducers/index.js';
import routes from './routes.js';

console.log(process.env.NODE_ENV);
/** how it works
  React
    ↓
  react-redux
    ↓
  redux → applyMiddleware(thunk)
    ↓
  react-router-redux
    ↓
  history
    ↓
  react-router
*/

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});
//use chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(hashHistory))
)(createStore)(reducer);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        {routes}
      </Router>
    </div>
  </Provider>,
  document.getElementById('root'));
