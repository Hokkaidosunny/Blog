import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App.js';
import HomePage from './containers/HomePage.js';
import ArticlePage from './containers/ArticlePage.js';
import EditPage from './containers/EditPage.js';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute components={{page: HomePage}} />
    <Route path="home" components={{page: HomePage}} />
    <Route path="article/:id" components={{page: ArticlePage}} />
    <Route path="edit" components={{page: EditPage}} />
  </Route>
);

export default routes;
