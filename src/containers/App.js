import React, { Component } from 'react';
import {Route} from 'react-router';
import Nav from '../components/common/Nav.js';
import Footer from '../components/common/Footer.js';
import BackToTop from '../components/common/BackToTop.js';
import Notification from '../components/common/Notification.js';
import HomePage from './HomePage.js';
import ArticlePage from './ArticlePage.js';
import EditPage from './EditPage.js';

import '../style/app.scss';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Nav location={this.props.location} />
        <Notification />
        <BackToTop />
        <div className='main'>
          <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/article/:id" component={ArticlePage} />
          <Route path="/edit" component={EditPage} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
