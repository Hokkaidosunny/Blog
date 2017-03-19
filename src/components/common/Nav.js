import React, {Component} from 'react';
import * as navigation from '../../util/navigation.js';
import cn from 'classnames';
import headimg from '../../imgs/headimg.jpeg';

export default class Nav extends Component {
  static displayName = 'Nav';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  switchTab = (index) => {
    this.setState({activeTab: index});
    if (index == 0) {
      navigation.goHomePage();
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
            {
              ['首页', '归档', '关于我'].map((item, index) => {
                return (
                  <a className={cn('nav-item', 'is-tab', {'is-active': this.state.activeTab == index})}
                    key={index}
                    onClick={() => {
                      this.switchTab(index);
                    }}
                    >
                    {item}
                  </a>
                );
              })
            }
          </div>
        </div>
      </nav>
    );
  }
}

const styles = {
  nav: {
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: '0'
  }
};
