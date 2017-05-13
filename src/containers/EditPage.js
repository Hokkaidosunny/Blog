import React, {Component} from 'react';
import { connect } from 'react-redux';

class EditPage extends Component {
  static displayName = 'EditPage';

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="field margin-top-2">
          <p className="control">
            <input className="input" type="text" placeholder="标题" />
          </p>
        </div>
        <div className="field margin-top-2">
          <p className="control">
            <input className="input" type="text" placeholder="标签" />
          </p>
        </div>
        <div className="field margin-top-2">
          <p className="control">
            <textarea className="textarea" style={styles.textarea}></textarea>
          </p>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(EditPage);

const styles = {
  textarea: {
    height: '20rem'
  }
};
