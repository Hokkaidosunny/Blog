import React, { Component } from 'react';
import Article from '../components/home/Article.js';
import {connect} from 'react-redux';
import {showNotification} from '../actions/notification.js';

import '../style/homePage.scss';

class HomePage extends Component {

  componentDidMount() {
    this.props.showNotification('', '123');
  }

  render() {
    return (
      <div className='homePage'>
        <div className='articles'>
          <Article />
          <Article />
          <Article />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {
  showNotification
})(HomePage);
