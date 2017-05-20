import fetchApi from '../util/fetchApi.js';

function fetchFlow({
  options,
  dispatch,
  preState,
  startFetchAction,
  fetchSuccessAction,
  fetchFailAction
}) {
  dispatch(startFetchAction({
    ...preState,
    isFetching: true,
    isFail: false,
    err: null
  }));

  fetchApi(options).then(data => {
    dispatch(fetchSuccessAction({
      ...preState,
      isFetching: false,
      isFail: false,
      err: null
    }, data));
  }).catch(err => {
    dispatch(fetchFailAction({
      ...preState,
      isFetching: false,
      isFail: true,
      err
    }));
  });
}

export default fetchFlow;
