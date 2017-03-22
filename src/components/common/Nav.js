import React, {Component} from 'react';
import {connect} from 'react-redux';
import { goHomePage, goEditPage} from '../../actions/navigations.js';
import cn from 'classnames';
import headimg from '../../imgs/headimg.jpeg';

class Nav extends Component {
  static displayName = 'Nav';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  switchTab = (index) => {
    this.setState({activeTab: index});
    if (index == 0) {
      this.props.goHomePage();
    }
  }

  render() {
    return (
      <nav className="nav has-shadow" style={styles.nav}>
        <div className="container">
          <div className="nav-left">
            <a className="nav-item">
              <img src={headimg} />
            </a>
            <a className="nav-item">
              Blog
            </a>
          </div>

          <span className="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div className="nav-right nav-menu">
            <a className={cn('nav-item', 'is-tab', {'is-active': this.props.pathname == ('/' || '/home')})}
              onClick={this.props.goHomePage}
              >
              首页
            </a>
            <a className={cn('nav-item', 'is-tab', {'is-active': this.props.pathname == '/edit'})}
              onClick={this.props.goEditPage}
              >
              编辑
            </a>
            <a className={cn('nav-item', 'is-tab', {'is-active': this.props.pathname == '/me'})}
              onClick={this.props.goHomePage}
              >
              关于我
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pathname: ownProps.location.pathname
  };
}

export default connect(mapStateToProps, {
  goHomePage,
  goEditPage
})(Nav);

const styles = {
  nav: {
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: '0'
  }
};
