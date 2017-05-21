import { handleActions } from 'redux-actions';
import returnPayload from './util/returnPayLoad.js';
import {
  START_FETCH_ARTICLE_INFO_LIST,
  FETCH_ARTICLE_INFO_LIST_SUCCESS,
  FETCH_ARTICLE_INFO_LIST_FAIL
} from '../actions/home/fetchArticleInfoList.js';

export default handleActions({
  [START_FETCH_ARTICLE_INFO_LIST]: returnPayload,
  [FETCH_ARTICLE_INFO_LIST_SUCCESS]: returnPayload,
  [FETCH_ARTICLE_INFO_LIST_FAIL]: returnPayload
}, {
  isFetch: false,
  isFail: false,
  err: null,
  articleInfoList: []
});
