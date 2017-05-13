import React, {Component} from 'react';
import {connect} from 'react-redux';
import { goHomePage, goEditPage} from '../../actions/navigations.js';
import cn from 'classnames';
import headimg from '../../imgs/headimg.jpeg';

class Nav extends Component {
  static displayName = 'Nav';

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
      <div className='nav-bar'>
        <nav className="nav has-shadow">
          <div className="container">
            <div className="nav-left" onClick={this.props.goHomePage}>
              <a className="nav-item">
                <img src={headimg} />
              </a>
              <a className="nav-item">
                <span>ShenShuaijia</span>
              </a>
            </div>

            <span className="nav-toggle">
              <span></span>
              <span></span>
              <span></span>
            </span>

            <div className="nav-right nav-menu">
              <a
                className={cn('nav-item', 'is-tab', {'is-active': this.props.pathname == ('/' || '/home')})}
                onClick={this.props.goHomePage}
                >
                首页
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pathname: ownProps.location && ownProps.location.pathname
  };
}

export default connect(mapStateToProps, {
  goHomePage,
  goEditPage
})(Nav);
