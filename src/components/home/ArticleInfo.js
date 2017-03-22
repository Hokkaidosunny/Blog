import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {goArticlePage} from '../../actions/navigations.js';

class ArticleInfo extends Component {
  static displayName = 'ArticleInfo';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='section padding-1.5' onClick={() => { this.props.goArticlePage(); }}>
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p>
                <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                <br />
                <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {
  goArticlePage
})(ArticleInfo);
