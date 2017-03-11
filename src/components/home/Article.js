import React, {Component, PropTypes} from 'react';

export default class Article extends Component {
  static displayName = 'Article';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <section className='section'>
        <div className='columns is-gapless'>
          <div className='column is-2' />
          <div className='column is-8'>
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
          <div className='column is-2' />
        </div>
      </section>
    );
  }
}
