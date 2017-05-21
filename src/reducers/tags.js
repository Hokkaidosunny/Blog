import { handleActions } from 'redux-actions';
import returnPayload from './util/returnPayLoad.js';
import {
  START_FETCH_TAGS,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAIL
} from '../actions/home/fetchTags.js';

export default handleActions({
  [START_FETCH_TAGS]: returnPayload,
  [FETCH_TAGS_SUCCESS]: returnPayload,
  [FETCH_TAGS_FAIL]: returnPayload
}, {
  isFetch: false,
  isFail: false,
  err: null,
  tags: []
});
