export function showNotification(level, msg) {
  return {
    type: 'Show_Notification',
    level,
    msg
  };
}

export function hideNotification() {
  return {
    type: 'Hide_Notification'
  };
}
