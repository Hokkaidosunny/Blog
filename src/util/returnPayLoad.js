/**
 * 直接用payload对象覆盖state
 */

export default (state, action) => {
  return {...state, ...action.payload};
};
