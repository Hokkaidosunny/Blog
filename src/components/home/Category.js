import React, {Component} from 'react';

export default class Category extends Component {
  static displayName = 'Category';

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

  render() {
    return (
      <div className='category'>
        <ul className='items'>
          <li className='active'>前端</li>
          <li>前端</li>
          <li>前端</li>
        </ul>
      </div>
    );
  }
}
