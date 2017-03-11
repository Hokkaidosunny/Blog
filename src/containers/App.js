import React, { Component, PropTypes } from 'react';
import Footer from '../components/common/Footer.js';
import Nav from '../components/common/Nav.js';
import Notification from '../components/common/Notification.js';
import '../style/app.scss';

class App extends Component {
  static propTypes = {
    page: PropTypes.element
  };

  render() {
    return (
      <div id='app'>
        <Nav />
        <Notification />
        {this.props.page}
        <Footer />
      </div>
    );
  }
}

export default App;
