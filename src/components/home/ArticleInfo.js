import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {goArticlePage} from '../../actions/navigations.js';

class ArticleInfo extends Component {
  static displayName = 'ArticleInfo';

  static propTypes = {
    articleId: PropTypes.number
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='art-info' onClick={() => {
        this.props.goArticlePage(this.props.articleId);
      }}>
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p>
                <strong className='is-medium'>Source-map  </strong>
                <small>3月21日</small>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                <br />
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps, {
  goArticlePage
})(ArticleInfo);
