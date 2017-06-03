import { handleActions } from 'redux-actions';
import returnPayload from './returnPayLoad.js';
import getFetchFlowTypes from './getFetchFlowTypes.js';

export default (fetchType) => {
  const {
    fetchStartType,
    fetchSuccessType,
    fetchFailType
  } = getFetchFlowTypes(fetchType);

  return handleActions({
    [fetchStartType]: returnPayload,
    [fetchSuccessType]: returnPayload,
    [fetchFailType]: returnPayload
  }, {
    isFetching: false,
    isFail: false,
    err: null,
    data: []
  });
};
