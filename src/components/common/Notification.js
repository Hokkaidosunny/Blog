import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {hideNotification} from '../../actions/notification.js';

class Notification extends Component {
  static displayName = 'Notification';

  static propTypes = {
    showNotification: PropTypes.bool,
    level: PropTypes.string,
    msg: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.showNotification ? (
      <div style={styles.bg}>
        <div className='columns is-gapless' style={styles.notification}>
          <div className='column is-4' />
          <div className="column is-4">
            <div className="notification is-primary">
              <button className="delete" onClick={() => {
                this.props.hideNotification();
              }} />
              {this.props.msg}
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  const {showNotification, level, msg} = state.notification;
  return {
    showNotification,
    level,
    msg
  };
}

export default connect(mapStateToProps, {
  hideNotification
})(Notification);

const styles = {
  notification: {
    position: 'fixed',
    top: '10rem',
    width: '100%',
    zIndex: '999'
  },
  bg: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    width: '100%',
    background: 'rgba(0,0,0,0.5)',
    zIndex: '998'
  }
};
