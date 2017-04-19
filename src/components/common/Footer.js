import React, {Component} from 'react';

export default class Footer extends Component {
  static displayName = 'Footer';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // const windowHeight = document.documentElement.clientHeight; //可见区域高度
    // const bodyHeight = document.body.clientHeight;
    // if (bodyHeight < windowHeight) {
    //   this.setState({
    //     footerStyle: {
    //       paddingBottom: '3rem',
    //       position: 'fixed',
    //       bottom: '0',
    //       width: '100%'
    //     }
    //   });
    // }
  }

  render() {
    return (
      <footer className="footer" style={styles.footer}>
        <div className="container">
          <div className="content has-text-centered">
            <p>
              All Rights Reserved By ShenShuaijia.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

const styles = {
  footer: {
    position: 'absolute',
    height: '7rem',
    padding: '0',
    lineHeight: '7rem',
    width: '100%',
    left: '0',
    bottom: '0',
    overflow: 'hidden'
  }
};
