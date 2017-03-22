import React, { Component, PropTypes } from 'react';
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
      <div id='app'>
        <Nav location={this.props.location} />
        <Notification />
        <div className='columns is-gapless'>
          <div className='column is-2' />
          <div className='column is-8'>
            {this.props.page}
          </div>
          <div className='column is-2' />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
