import React, {Component} from 'react';
import _ from 'lodash';

export default class BackToTop extends Component {
  static displayName = 'BackToTop';

  constructor() {
    super();
    this.state = {ifShow: false};
  }

  componentDidMount() {
    const checkSroll = () => {
      if (document.body.scrollTop > window.screen.height) {
        this.setState({ifShow: true});
      } else {
        this.setState({ifShow: false});
      }
    };

    checkSroll();
    window.onscroll = _.debounce(checkSroll, 200);
  }

  goTop = () => {
    document.body.scrollTop = 0;
  }

  render() {
    return this.state.ifShow ? (
      <div className='back-to-top'>
        <button onClick={this.goTop}>^</button>
      </div>
    ) : null;
  }
}
