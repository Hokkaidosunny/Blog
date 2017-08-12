---
title: 优化webpack配置
date: 2017-08-12 14:10:09
tags: webpack
---
### happypack

happypack可以加快rebuild的速度

* 在开发的时候，需要将babel-loader替换成happypack/loader

```javascript
{
  test: /\.(js|jsx)$/,
  exclude: /(node_modules|vendor)/,
  loader: isDev ? 'happypack/loader' : 'babel-loader'
}
```

* 同时添加插件, 根据需要定义不同的babel配置，控制线程的数量

```javascript
new HappyPack({
  loaders: [{
    path: 'babel-loader',
    query: getBabelrc({isDev})
  }],
  threads: 4
})
```

### AutoDllPlugin

同样用来加快rebuild速度。它的原理和webpack提供的dll加速方案一样，将常用的不变的模块编译成一个文件，以后rebuild的时候不再编译，通通指向那个预编译好的文件。那是一套极其繁琐的方案，这个插件帮你简化了配置。

```javascript
new AutoDllPlugin({
  inject: true, // will inject the DLL bundles to index.html
  filename: '[name].[hash].js',
  entry: {
    vendor: ['react', 'react-dom']
  }
})
```

that's all.

### ExtractTextPlugin

用来将你项目中的所有css提出来变成一个文件。在生产环境中可以减少请求，但是不要在开发环境中使用，这会减慢你的编译速度。

这个配置有点繁琐，大家之前去github上看吧

### 缓存你的vendor文件

一般我们使用的node_modules里的文件是不会变，所以我们经常会这么做，把所有来自node_modules的文件编译成一个vendor.js，然后再加载我们的main.js。那我们怎么去让浏览器缓存我们的vendor.js呢，要做几件事

* 将 `[name].[hash].js`改成`[name].[chunkhash].js`,这是为了给每个文件各自不同的hash，不然每次build，所有的文件hash会一样。

  我们每次build的时候，hash都会变，这是因为webpack运行的时候需要一段runtime的代码，这段代码一直在变，导致每次build都会产生不同的hash，而`[name].[hash].js`会将该hash用于所有的文件。

* 将这段runtime的代码抽离出来，一般这段代码会加在第一个被加载的js文件里，这就导致这个js文件的hash一直在变。

* 最后，我们会得到3个文件 `runtime.js` `vendor.js` `main.js`,依次插入html中，并且这个vendor.js自己的hash是不会随着build而改变的。这个时候，我们就可以使用manifest文件来缓存了。

webpack官网有教程，大家之前去上面看吧

### NamedModulesPlugin

webpack为了减小文件大小，会对模块重命名。在你运行build完的js，有什么错误信息打印出来的时候，你完全看不懂这是个什么模块，这个时候你就需要这个插件，但是也不要在生产环境中用，会增加你的文件大小。

```javascript
new webpack.NamedModulesPlugin()
```

that's all.

### build出按文件类型分类的文件夹

对与我这种强迫症，我希望我build出来的东西都是正确归类，整齐摆放的，所以我希望我的js统统在js文件夹，css统统在css文件夹

* 首先是css

```javascript
new ExtractTextPlugin({
  filename: getPath => getPath('css/[name].[contenthash].css').replace('css/js', 'css'),
  allChunks: true
})
```

本来filename填`css/[name].[contenthash].css`应该就足够了，但是它会把你放在`css/js`文件夹下，所以在issue下，找到了这种方法来把`css/js`替换成`css`

* 其余的很简单，在我们给我们的module取名的时候，取成`js/xx`就行，例如

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: 'js/vendor',
  minChunks: function(module) {
    //去掉sass
    if(module.resource && (/^.*\.(css|scss|sass)$/).test(module.resource)) {
      return false;
    }
    //来自node_modules的文件统一打进vendor
    return module.context && module.context.indexOf("node_modules") !== -1;
  }
}),
new webpack.optimize.CommonsChunkPlugin({
  name: "js/runtime",
  minChunks: Infinity
})
```

### 记得压缩的时候丢掉console

```javascript
new UglifyJSPlugin({
  sourceMap: true,
  compress: {
    warnings: false,  //buid 的时候不要报warnings
    drop_console: true  //no console
  }
})
```

不仅仅是为了减少代码量，在生产环境运行时，让用户看到你一堆debug信息，实在不雅观。
