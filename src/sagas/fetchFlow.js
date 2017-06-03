import fetchApi from '../util/fetchApi.js';
import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import getFetchFlowTypes from '../util/getFetchFlowTypes.js';

/**
 * {
 *  type,
 *  payload:{
 *    type: 'FETCH_ARTICLE_INFO'
 *    url,
 *    method = 'GET',
 *    params,
 *    json = false,
 *    customHeaders = {}
 *  }
 * }
 */

function* fetchFlow(action) {
  const {
    fetchStartType,
    fetchSuccessType,
    fetchFailType
  } = getFetchFlowTypes(action.payload.type);
  try {
    yield put({
      type: fetchStartType,
      payload: {
        isFetching: true,
        isFail: false,
        err: null
      }
    });
    const result = yield fetchApi(action.payload);
    console.warn(`mock:${action.payload.url}`);
    console.warn(result);
    if (result.retCode === 200) {
      yield put({
        type: fetchSuccessType,
        payload: {
          isFetching: false,
          isFail: false,
          data: result.retData,
          err: null
        }
      });
    } else {
      yield put({
        type: fetchFailType,
        payload: {
          isFetching: false,
          isFail: true,
          err: new Error(result.retMsg)
        }
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: fetchFailType,
      payload: {
        isFetching: false,
        isFail: true,
        err: e
      }
    });
  }
}

export default function* () {
  console.log('fetchFlow saga');
  yield takeEvery('FETCH_FLOW', fetchFlow);
}
