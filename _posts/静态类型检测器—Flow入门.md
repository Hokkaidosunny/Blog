---
title: 静态类型检测器—Flow入门
date: 2018-05-12 02:07:48
tags: js
---

## Flow入门

### 介绍
一个 JAVASCRIPT 静态类型检测器
* Flow 使用类型接口查找错误，甚至不需要任何类型声明。 它也能够准确地跟踪变量的类型，就像运行时那样
* Flow 专为 JavaScript 程序员设计。 他能够理解常用 JS 方言和极具动态的特性
* Flow 能立刻检测代码变化，在开发 JS 时提供快速不断地反馈

### 安装
1. 在项目中安装flow `npm i -D flow-bin`
2. 在项目中安装babel插件 `npm i -D babel-plugin-transform-flow-strip-types`
2. 在编辑器中安装flow插件，各个商店应该会有各自对应的插件
3. 全局安装flow-type`npm i -g flow-typed`，flow-typed是什么见下面👇

### 使用

#### 在`.babelrc`添加插件
```
{
  "presets": [
    "next/babel"
  ],
  "plugins": [
    "transform-decorators-legacy",
    "transform-flow-strip-types"
  ]
}
```

#### 在根目录中添加`.flowconfig`文件
```
[ignore]
<PROJECT_ROOT>/node_modules/.*
<PROJECT_ROOT>/coverage/.*
<PROJECT_ROOT>/.next/.*

[options]
module.file_ext=.js
module.file_ext=.jsx
module.file_ext=.json
module.file_ext=.css
module.file_ext=.scss
module.file_ext=.less
module.name_mapper.extension='css' -> 'empty/object'
module.name_mapper.extension='scss' -> 'empty/object'
module.name_mapper.extension='less' -> 'empty/object'

esproposal.decorators=ignore

module.name_mapper='^@src\/\(.*\)$' -> '<PROJECT_ROOT>/\1'
```
这是我项目中的配置文件，主要做了几件事
1. 忽略一些不需要检查的文件夹
2. 指定需要检查文件的后缀名
3. 将样式文件解析成空对象
4. 运行使用decorator语法
5. 指定模块解析方式，因为我的模块路径都是@src开头的

#### 在根目录中添加`flow-typed`文件夹
这个文件夹是用来存放第三方或者你自己编写的定义文件的地方，在flow运行的时候会去读文件夹里所有文件的定义，当然你也可以通过配置文件修改默认文件夹的名字。
比如新建一个`flow-typed/global.js`文件,来定义一些全局变量
```javascript
declare var document: Object;

declare var window: Object;
```

#### 使用flow检查文件
新建一个文件`src/index.js`
```javascript
// @flow
function concat(a: string, b: string): string {
  return a + b;
}

concat("foo", "bar"); // Works!
// $ExpectError
concat(true, false);  // Error!
```
通过在文件头部添加`// @flow`来告诉flow这是个需要检查的文件，可以看到flow是个很自由的工具，尤其是对已经开发很久的项目来说，可以一点点使用flow，而不必对整个项目进行改造。
一但对参数指定好类型后，flow就可以开始正常工作了，如果需要flow检查又没有定义类型，flow也会提示你去定义。
对于如何去定义各种不同的变量、函数，这些在文档中会有更加详细的介绍，这里就不细展开了。

#### 类型的模块化
怎么去暴露已经定义好的类型给其他文件使用呢？
1. 新建一个暴露js模块，类型混合的文件`a.js`
```javascript
export type A = {
  name: string,
  value: number
}

export default {
  name: 'a',
  value: 100
}
```

2. 新建`b.js`引用`a.js`
```javascript
import a from './a.js'
import type { A } from './a.js'

const b: A = {
  ...a,
  name: 'b'
}

export default b
```


#### 使用第三方库
```javascript
// @flow
import _ from 'lodash' // Error

```
flow会报找不到该模块，这个时候需要我们去下载lodash的定义文件，用flow-typed 可以很方便的管理这些第三方库的定义文件

### flow-typed
一个查找安装第三方库定义文件的管理工具

1. 查找
`flow-typed search lodash`

```
Found definitions:
╔════════╤═════════════════╤═════════════════════╗
║ Name   │ Package Version │ Flow Version        ║
╟────────┼─────────────────┼─────────────────────╢
║ lodash │ v4.x.x          │ >=v0.63.x           ║
╟────────┼─────────────────┼─────────────────────╢
║ lodash │ v4.x.x          │ >=v0.55.x <=v0.62.x ║
╟────────┼─────────────────┼─────────────────────╢
║ lodash │ v4.x.x          │ >=v0.47.x <=v0.54.x ║
╟────────┼─────────────────┼─────────────────────╢
║ lodash │ v4.x.x          │ >=v0.38.x <=v0.46.x ║
╟────────┼─────────────────┼─────────────────────╢
║ lodash │ v4.x.x          │ >=v0.28.x <=v0.37.x ║
╚════════╧═════════════════╧═════════════════════╝
```

2. 选一个版本安装`flow-typed install lodash@v4.x.x`，下载的文件会默认保存在`flow-typed/npm`文件夹下，并且在flow运行的时候自动加载，这个时候就能解决刚刚’模块找不到‘的报错

3. 如果搜索不到对应的定义文件怎么办？我们可以自己手动新建。
* 如果我们从npm上下了一个`clipboard`库使用
* 添加对应的定义，新建文件`flow-typed/npm/clipboard.js`
```javascript
declare module 'clipboard' {
  declare export default any
}
```
这里，我很粗暴的把这个模块定义成了any类型，当然如果你对模块熟悉或者想定义的更详细的话，也可以把这个模块的各个属性定义补充完整。具体怎么定义，可以查看文档，这里也不展开了。

### 常见问题

1. 引入css文件报错
我们可以下载一个空模块`npm i -D empty`，然后在配置文件中，把所有的样式文件指向该模块下的空对象
```
[options]
module.name_mapper.extension='css' -> 'empty/object'
module.name_mapper.extension='scss' -> 'empty/object'
module.name_mapper.extension='less' -> 'empty/object'
```

2. 使用window、document等全局对象报错
我们可以在`flow-typed/xxx.js`中，声明这些全局对象的类型
```javascript
declare var document: Object;

declare var window: Object;

declare var process: Object;

declare function fetch(url: string, option?: any): Promise<any>;
```

3. 使用fetch报错，见上👆

4. 使用decorator语法报错
在配置文件中添加
```
[options]
esproposal.decorators=ignore
```
很不幸的是，即使忽略decorator语法报错，在我们暴露一些经过修饰器修饰的模块给其他文件使用的时候，也会遇到报错的问题，根本原因是flow不支持decorator语法的类型检查，所以除非这个模块不会被其他文件使用，可以使用decorator语法，不然最好的选择就是不用decorator语法

### 最后
感谢阅读，有错误希望能及时指正


