import React, { Component } from 'react';
import marked from 'marked';
import {connect} from 'react-redux';
import {showNotification} from '../actions/notification.js';

const articles = {
  0: require('../db/source-map.md')
};

class ArticlePage extends Component {

  componentDidMount() {
    const _html = marked(articles[0]);
    this._article.innerHTML = _html;
  }

  render() {
    return (
      <div className='ArticlePage section'>
        <div className="content article">
          <h4 className='title is-4' style={styles.title}>source-map</h4>
          <article className="markdown-body" ref={_article => {
            this._article = _article;
          }}>
          </article>
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
})(ArticlePage);

const styles = {
  title: {
    textAlign: 'center'
  }
};
