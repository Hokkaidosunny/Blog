import { createAction } from 'redux-actions';
import { FETCH_FLOW } from '../actionTypes.js';

export const FETCH_TAGS = 'FETCH_TAGS';

const fetchTags = createAction(FETCH_FLOW, () => {
  return {
    type: FETCH_TAGS,
    url: 'http://127.0.0.1:4000/tags',
    json: true
  };
});

export default fetchTags;
