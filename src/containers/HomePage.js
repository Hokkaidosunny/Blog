import React, { Component } from 'react';
import ArticleInfo from '../components/home/ArticleInfo.js';
import {connect} from 'react-redux';
import {showNotification} from '../actions/notification.js';

class HomePage extends Component {

  componentDidMount() {
    //this.props.showNotification('', '123');
  }

  render() {
    return (
      <div className='homePage'>
        <div className='articles'>
          <ArticleInfo />

        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps, {
  showNotification
})(HomePage);
