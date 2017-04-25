import React, { Component } from 'react';
import ArticleInfo from '../components/home/ArticleInfo.js';
import {connect} from 'react-redux';
import {showNotification} from '../actions/notification.js';
import '../style/homePage.scss';

class HomePage extends Component {

  componentDidMount() {
    //this.props.showNotification('', '123');
  }

  render() {
    const articleInfo_0 = {
      articleId: 0
    };
    const articleInfo_1 = {
      articleId: 1
    };
    return (
      <div className='homePage'>
        <div className='articles'>
          <ArticleInfo {...articleInfo_0} />
          <ArticleInfo {...articleInfo_1} />
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
