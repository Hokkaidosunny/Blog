const fs = require('fs')
const path = require('path')

const baseUrl = 'https://github.com/Saul-Shen/blog/blob/master/_posts/'
const _posts = path.join(__dirname, '../_posts')

const fileNames = fs.readdirSync(_posts)

const head = `
# Personal Blog
[https://blog.shenshuaijia.com/](https://blog.shenshuaijia.com/)\n

`
const str = fileNames.reverse().reduce((str, fileName) => {
  return (
    str +
    `- [${fileName.slice(0, fileName.length - 3)}](${baseUrl}${fileName})\n`
  )
}, head)

fs.writeFileSync(path.join(__dirname, '../README.md'), str)
