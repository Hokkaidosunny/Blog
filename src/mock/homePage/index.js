import fetchMock from 'fetch-mock';
import makeResponse from '../makeResponse.js';

fetchMock.post('end:articleInfoList', () => {
  return makeResponse([{
    'id': 1,
    'title': 'source-map',
    'tags': ['webpack', 'js'],
    'author': 'shenshuaijia',
    'bref': '本项目主要介绍如何使用vue+vuex+vue-router开启一个SPA应用，注重的是将应用搭建起来，所以项目不大',
    'date': '3.1'
  }]);
});

fetchMock.get('end:tags', () => {
  return makeResponse(['All', 'webpack', 'javascript', 'css', 'html']);
});
