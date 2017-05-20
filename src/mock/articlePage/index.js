import fetchMock from 'fetch-mock';

console.log(22);
fetchMock.get('end:articleInfoList', () => {
  return {
    retCode: 200,
    retMsg: '',
    retData: [{
      'id': 1,
      'title': 'source-map',
      'author': 'shenshuaijia',
      'bref': '本项目主要介绍如何使用vue+vuex+vue-router开启一个SPA应用，注重的是将应用搭建起来，所以项目不大',
      'date': '3.1'
    }]
  };
});
