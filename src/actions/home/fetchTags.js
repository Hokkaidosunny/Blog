import { createAction } from 'redux-actions';
import fetchFlow from '../util/fetchFlow.js';

export const START_FETCH_TAGS = 'GET_TAGS';

export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';

export const FETCH_TAGS_FAIL = 'FETCH_TAGS_FAIL';

const fetchTagsSuccess = createAction(FETCH_TAGS_SUCCESS, (preState, data) => {
  const tags = {
    ...preState,
    tags: data.retData
  };

  return tags;
});

export default () => {
  return (dispatch, getState) => {
    const state = getState();

    fetchFlow({
      dispatch,
      options: {
        url: 'http://127.0.0.1:4000/tags',
        json: true,
        method: 'GET'
      },
      preState: state.articleInfoList,
      startFetchAction: createAction(START_FETCH_TAGS),
      fetchSuccessAction: fetchTagsSuccess,
      fetchFailAction: createAction(FETCH_TAGS_FAIL)
    });
  };
};
