module.exports = {
  title: `Saul Shen's blog`,
  description: 'Keep simple, keep happy',
  base: '/blog/',
  plugins: ['@vuepress/blog'],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Github', link: 'https://github.com/Saul-Shen' }
    ],
    sidebar: [
      {
        title: '2016', // 必要的
        path: '/2016/1114', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        // collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: ['/2016/1114']
      },
      {
        title: '2017',
        path: '/2017/0314', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          '/2017/0314',
          '/2017/0510',
          '/2017/0513',
          '/2017/0528',
          '/2017/0610',
          '/2017/0716',
          '/2017/0717',
          '/2017/0826',
          '/2017/1203'
        ]
      },
      {
        title: '2018',
        path: '/2018/0126',
        sidebarDepth: 1,
        children: [
          '/2018/0126',
          '/2018/0211',
          '/2018/0512',
          '/2018/1120',
          '/2018/1123',
          '/2018/1210'
        ]
      },
      {
        title: '2019',
        path: '/2019/0114',
        sidebarDepth: 1,
        children: [
          '/2019/0114',
          '/2019/0116',
          '/2019/0314',
          '/2019/0526',
          '/2019/0527',
          '/2019/1230'
        ]
      },
      {
        title: '2020', // 必要的
        path: '/2020/0317',
        sidebarDepth: 1,
        children: ['/2020/0317']
      }
    ]
  }
}
