/**
 * 直接返回payload对象作为state树上的值
 */

export default (state, action) => {
  return action.payload;
};
