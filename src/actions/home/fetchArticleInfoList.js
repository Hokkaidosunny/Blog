import { createAction } from 'redux-actions';
import fetchFlow from '../util/fetchFlow.js';

export const START_FETCH_ARTICLE_INFO_LIST = 'GET_ARTICLE_INFO_LIST';

export const FETCH_ARTICLE_INFO_LIST_SUCCESS = 'FETCH_ARTICLE_INFO_LIST_SUCCESS';

export const FETCH_ARTICLE_INFO_LIST_FAIL = 'FETCH_ARTICLE_INFO_LIST_FAIL';

const fetchArticleInfoListSuccess = createAction(FETCH_ARTICLE_INFO_LIST_SUCCESS, (preState, data) => {
  const articleInfoList = {
    ...preState,
    articleInfoList: data.retData
  };

  return articleInfoList;
});

export default (tag = '') => {
  return (dispatch, getState) => {
    const state = getState();

    fetchFlow({
      dispatch,
      options: {
        url: 'http://127.0.0.1:4000/articleInfoList',
        json: true,
        method: 'POST',
        params: {
          tag
        }
      },
      preState: state.articleInfoList,
      startFetchAction: createAction(START_FETCH_ARTICLE_INFO_LIST),
      fetchSuccessAction: fetchArticleInfoListSuccess,
      fetchFailAction: createAction(FETCH_ARTICLE_INFO_LIST_FAIL)
    });
  };
};
