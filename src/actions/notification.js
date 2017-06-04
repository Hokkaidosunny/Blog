import _ from 'lodash';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const addNotification = (msg, level = 0) => {
  return (dispatch, getState) => {
    const {notifications} = getState();

    const notification = {
      id: _.uniqueId(),
      msg,
      level
    };

    dispatch({
      type: ADD_NOTIFICATION,
      payload: [...notifications, notification]
    });

    setTimeout(() => {
      dispatch(removeNotification(notification.id));
    }, 2000);

  };
};

export const removeNotification = (id) => {
  return (dispatch, getState) => {
    const {notifications} = getState();

    const index = notifications.findIndex(item => {
      return item.id === id;
    });

    if (index < 0) return;

    notifications.splice(index, 1);

    dispatch({
      type: REMOVE_NOTIFICATION,
      payload: [...notifications]
    });

  };
};
