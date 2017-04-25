import React, { Component } from 'react';
import marked from 'marked';
import {connect} from 'react-redux';
import {showNotification} from '../actions/notification.js';
import '../style/articlePage.scss';

class ArticlePage extends Component {

  componentDidMount() {
    const _html = marked(require(`../db/${this.props.articleId}.md`));
    this._article.innerHTML = _html;
  }

  render() {
    return (
      <div>
        <div className="content">
          {/* <h4 className='title is-4 has-text-centered'>source-map</h4> */}
          <article className="markdown-body" ref={_article => {
            this._article = _article;
          }}>
          </article>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    articleId: ownProps.params.id
  };
}

export default connect(mapStateToProps, {
  showNotification
})(ArticlePage);
