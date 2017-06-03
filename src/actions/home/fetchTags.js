import { createAction } from 'redux-actions';

export const FETCH_TAGS = 'FETCH_TAGS';

const fetchTags = createAction('FETCH_FLOW', () => {
  return {
    type: FETCH_TAGS,
    url: 'http://127.0.0.1:4000/tags',
    json: true,
    method: 'GET'
  };
});

export default fetchTags;
