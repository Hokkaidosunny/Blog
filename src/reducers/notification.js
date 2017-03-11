/**
 * 通知
 */
export default function notification(state = {
  showNotification: false,
  level: '',
  msg: ''
}, action) {
  switch (action.type) {
    case 'Show_Notification':
      return Object.assign({}, state, {
        showNotification: true,
        level: action.level,
        msg: action.msg
      });
    case 'Hide_Notification':
      return Object.assign({}, state, {
        showNotification: false,
        level: '',
        msg: ''
      });
    default:
      return state;
  }
}
