import { handleActions } from 'redux-actions';
import { coverState } from './returnPayLoad.js';
import getFetchFlowTypes from './getFetchFlowTypes.js';

export default (fetchType) => {
  const {
    fetchStartType,
    fetchSuccessType,
    fetchFailType
  } = getFetchFlowTypes(fetchType);

  return handleActions({
    [fetchStartType]: coverState,
    [fetchSuccessType]: coverState,
    [fetchFailType]: coverState
  }, {
    isFetching: false,
    isFail: false,
    err: null,
    data: []
  });
};
