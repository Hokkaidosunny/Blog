import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/common/Footer.js';
import Nav from '../components/common/Nav.js';
import Notification from '../components/common/Notification.js';
import '../style/app.scss';

class App extends Component {
  static propTypes = {
    page: PropTypes.element,
    location: PropTypes.object
  };

  render() {
    return (
      <div className='app'>
        <Nav location={this.props.location} />
        <Notification />
        <div className='main'>
          {this.props.page}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
