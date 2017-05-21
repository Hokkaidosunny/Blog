import React, {Component} from 'react';
import { connect } from 'react-redux';
import fetchTags from '../../actions/home/fetchTags.js';

class Category extends Component {
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
    this.props.fetchTags();
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='category'>
        <ul className='items'>
          <li className='active'>All</li>
          {
            this.props.tags && this.props.tags.map((item, index) => {
              return (<li key={index}>{item}</li>);
            })
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tags: state.tags.tags
  };
}

export default connect(mapStateToProps, {
  fetchTags
})(Category);
