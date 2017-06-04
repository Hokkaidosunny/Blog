import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addNotification, removeNotification} from '../../actions/notification.js';
import {TransitionMotion, spring} from 'react-motion';
import '../../style/components/notifications.scss';

class Notifications extends Component {
  static displayName = 'Notifications';

  static propTypes = {
  };

  willEnter = () => {
    return {
      height: 0
    };
  }

  willLeave = () => {
    return {
      height: spring(0)
    };
  }

  getStyles = () => {
    return this.props.notifications.map(item => {
      return {
        key: item.id,
        data: item,
        style: {
          height: spring(50)
        }
      };
    });
  }

  render() {
    return (
      <TransitionMotion
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        styles={this.getStyles()}
        >
        {
          interpolatedStyles =>
            <div className='notifications-container'>
              {
                interpolatedStyles.map(config => {
                  console.log(config);
                  return (
                    <div
                      className="is-primary item"
                      style={config.style}
                      >
                      {config.data.msg}
                    </div>
                  );
                })
              }
            </div>
        }
      </TransitionMotion>
    );
  }
}

function mapStateToProps(state) {
  const {notifications} = state;
  return {
    notifications
  };
}

export default connect(mapStateToProps, {
  addNotification,
  removeNotification
})(Notifications);
