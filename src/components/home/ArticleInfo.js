import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {goArticlePage} from '../../actions/navigations.js';

class ArticleInfo extends Component {
  static displayName = 'ArticleInfo';

  static propTypes = {
    articleInfo: PropTypes.object
  };

  render() {
    const {id, title, bref, date} = this.props.articleInfo;
    return (
      <div className='art-info' onClick={() => {
        this.props.goArticlePage(id);
      }}>
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p>
                <strong className='is-medium'>{title}  </strong>
                <small>{date}</small>
                <br />
                {bref}
                <br />
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default connect(null, {
  goArticlePage
})(ArticleInfo);
