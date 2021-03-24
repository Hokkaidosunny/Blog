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
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: ['/2016/1114']
      },
      {
        title: '2017', // 必要的
        path: '/2017/0314', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
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
      }
    ]
  }
}
