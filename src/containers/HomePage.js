import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleInfo from '../components/home/ArticleInfo.js';
import {connect} from 'react-redux';
import {showNotification} from '../actions/notification.js';
import Category from '../components/home/Category.js';
import fetchArticleInfoList from '../actions/home/fetchArticleInfoList.js';

import '../style/homePage.scss';

class HomePage extends Component {
  static propTypes = {
    articleInfoList: PropTypes.array,
    fetchArticleInfoList: PropTypes.func
  };

  componentWillMount() {
    this.props.fetchArticleInfoList();
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className='home-page'>
        <Category />
        <div className='articles'>
          {
            this.props.articleInfoList.map((item, index) => {
              return <ArticleInfo key={index} articleInfo={item} />;
            })
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articleInfoList: state.articleInfoList.articleInfoList
  };
}

export default connect(mapStateToProps, {
  showNotification,
  fetchArticleInfoList
})(HomePage);
