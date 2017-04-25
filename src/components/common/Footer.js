import React, {Component} from 'react';

export default class Footer extends Component {
  static displayName = 'Footer';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer className="footer-info has-text-centered">
        <p>
          All Rights Reserved By ShenShuaijia.
        </p>
      </footer>
    );
  }
}
