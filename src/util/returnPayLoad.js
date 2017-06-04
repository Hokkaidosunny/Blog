/**
 * 用payload对象的key覆盖state
 */
export const coverState = (state, action) => {
  return {...state, ...action.payload};
};


/**
 * 用payload对象整体替换state
 */
export const replaceState = (state, action) => {
  return action.payload;
};
