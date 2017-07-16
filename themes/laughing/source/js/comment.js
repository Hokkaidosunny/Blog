var gitment = new Gitment({
  id: 'Your page ID', // optional
  owner: 'Hokkaidosunny',
  repo: 'blog-comment',
  oauth: {
    client_id: '1917d1736d987beb33fd',
    client_secret: '8de13a369c5dfbdf5469e1f8afe06fa7f52e42a9',
  },
  // ...
  // For more available options, check out the documentation below
})

gitment.render(document.getElementById('gitments'))
