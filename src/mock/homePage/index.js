import fetchMock from 'fetch-mock';
import makeResponse from '../makeResponse.js';

fetchMock.post('end:articleInfoList', (url, opts) => {
  console.log(url, opts);
  const tag = JSON.parse(opts.body).tag;
  let data;
  switch (tag) {
    case 'All': {
      data = [0].map(i => {
        return {
          'id': i,
          'title': 'All',
          'tags': ['webpack', 'js'],
          'author': 'shenshuaijia',
          'bref': 'All本项目主要介绍如何使用vue+vuex+vue-router开启一个SPA应用，注重的是将应用搭建起来，所以项目不大',
          'date': '3.1'
        };
      });
      break;
    }
    case 'webpack': {
      data = [0, 1, 2].map(i => {
        return {
          'id': i,
          'title': 'webpack',
          'tags': ['webpack', 'js'],
          'author': 'shenshuaijia',
          'bref': 'webpack本项目主要介绍如何使用vue+vuex+vue-router开启一个SPA应用，注重的是将应用搭建起来，所以项目不大',
          'date': '3.1'
        };
      });
      break;
    }
    case 'javascript': {
      data = [0, 1, 2].map(i => {
        return {
          'id': i,
          'title': 'javascript',
          'tags': ['webpack', 'js'],
          'author': 'shenshuaijia',
          'bref': 'javascript本项目主要介绍如何使用vue+vuex+vue-router开启一个SPA应用，注重的是将应用搭建起来，所以项目不大',
          'date': '3.1'
        };
      });
      break;
    }
    case 'css': {
      data = [0, 1].map(i => {
        return {
          'id': i,
          'title': 'css',
          'tags': ['webpack', 'js'],
          'author': 'shenshuaijia',
          'bref': 'css本项目主要介绍如何使用vue+vuex+vue-router开启一个SPA应用，注重的是将应用搭建起来，所以项目不大',
          'date': '3.1'
        };
      });
      break;
    }
    case 'html': {
      data = [0, 1, 2].map(i => {
        return {
          'id': i,
          'title': 'html',
          'tags': ['webpack', 'js'],
          'author': 'shenshuaijia',
          'bref': '本项目主要介绍如何使用vue+vuex+vue-router开启一个SPA应用，注重的是将应用搭建起来，所以项目不大',
          'date': '3.1'
        };
      });
      break;
    }
    default: {
      data = [0].map(i => {
        return {
          'id': i,
          'title': 'All',
          'tags': ['webpack', 'js'],
          'author': 'shenshuaijia',
          'bref': 'All本项目主要介绍如何使用vue+vuex+vue-router开启一个SPA应用，注重的是将应用搭建起来，所以项目不大',
          'date': '3.1'
        };
      });
      break;
    }
  }
  return makeResponse(data);
});

fetchMock.get('end:tags', () => {
  return makeResponse(['All', 'webpack', 'javascript', 'css', 'html']);
});
