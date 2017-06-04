import createFetchFlowReducer from '../util/createFetchFlowReducer.js';
import {FETCH_ARTICLE_INFO_LIST} from '../actions/home/fetchArticleInfoList.js';
import {FETCH_TAGS} from '../actions/home/fetchTags.js';
import notifications from './notifications.js';

export default {
  articleInfoList: createFetchFlowReducer(FETCH_ARTICLE_INFO_LIST),
  tags: createFetchFlowReducer(FETCH_TAGS),
  notifications
};
