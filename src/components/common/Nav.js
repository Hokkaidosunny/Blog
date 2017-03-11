import React, {Component} from 'react';
import headimg from '../../imgs/headimg.jpeg';

export default class Nav extends Component {
  static displayName = 'Nav';

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
            <a className="nav-item is-tab is-active">
              首页
            </a>
            <a className="nav-item is-tab">
              分类
            </a>
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
    width: '100%'
  }
};
