import React, {Component, PropTypes} from 'react';

export default class Footer extends Component {
  static displayName = 'Footer';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      footerStyle: {
        paddingBottom: '3rem'
      }
    };
  }

  componentDidMount() {
    const windowHeight = document.documentElement.clientHeight; //可见区域高度
    const bodyHeight = document.body.clientHeight;
    if (bodyHeight < windowHeight) {
      this.setState({
        footerStyle: {
          paddingBottom: '3rem',
          position: 'fixed',
          bottom: '0',
          width: '100%'
        }
      });
    }
  }

  render() {
    return (
      <footer className="footer" style={this.state.footerStyle}>
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <strong>Bulma</strong> by <a href="http://jgthms.com">Jeremy Thomas</a>. The source code is licensed
              <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
              is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
            </p>
            <p>
              <a className="icon" href="https://github.com/jgthms/bulma">
                <i className="fa fa-github"></i>
              </a>
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
