import { createAction } from 'redux-actions';

export const FETCH_ARTICLE_INFO_LIST = 'FETCH_ARTICLE_INFO_LIST';

const fetchArticleInfoList = createAction('FETCH_FLOW', (tag = '') => {
  return {
    type: FETCH_ARTICLE_INFO_LIST,
    url: 'http://127.0.0.1:4000/articleInfoList',
    json: true,
    method: 'POST',
    params: {
      tag
    }
  };
});

export default fetchArticleInfoList;
