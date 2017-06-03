import React, {Component} from 'react';
import { connect } from 'react-redux';
import fetchTags from '../../actions/home/fetchTags.js';
import fetchArticleInfoList from '../../actions/home/fetchArticleInfoList.js';

class Category extends Component {
  static displayName = 'Category';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  componentWillMount() {
    this.props.fetchTags();
  }

  componentDidMount() {
  }

  changeActive = (activeIndex) => {
    this.setState({activeIndex});
    this.props.fetchArticleInfoList(
      this.props.tags[activeIndex]
    );
  }

  render() {
    return (
      <div className='category'>
        <ul className='items'>
          {
            this.props.tags && this.props.tags.map((item, index) => {
              return (
                <li
                  key={index}
                  className={this.state.activeIndex === index ? 'active' : ''}
                  onClick={() => this.changeActive(index)}
                  >
                  {item}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tags: state.tags.data
  };
}

export default connect(mapStateToProps, {
  fetchTags,
  fetchArticleInfoList
})(Category);
