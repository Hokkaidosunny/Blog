---
title: 各种source-map对比
date: 2017-07-16 00:53:08
tags: webpack
---

### eval

每个 module 会通过 eval() 来执行，并在后面添加 `//# sourceURL`

##### 形式：

```javascript
webpackJsonp([1],[
  function(module,exports,__webpack_require__){
    eval(
      ...
      //# sourceURL=webpack:///./src/js/index.js?'
    )
  },
  function(module,exports,__webpack_require__){
    eval(
      ...
      //# sourceURL=webpack:///./src/static/css/app.less?./~/.npminstall/css-loader/0.23.1/css-loader!./~/.npminstall/postcss-loader/1.1.1/postcss-loader!./~/.npminstall/less-loader/2.2.3/less-loader'
    )
  },
  function(module,exports,__webpack_require__){
    eval(
      ...
      //# sourceURL=webpack:///./src/tmpl/appTemplate.tpl?"
    )
  },
...])
```

##### 特点：

`eval`有最好的性能，但是它只映射到每个模块源码文件，没有行列信息。



### source-map

打包代码同时创建一个新的 sourcemap 文件， 并在打包文件的末尾添加 `//# sourceURL `注释行告诉 JS 引擎文件在哪儿

##### 形式：

```javascript
webpackJsonp([1],[
  function(e,t,i){...},
  function(e,t,i){...},
  function(e,t,i){...},
  function(e,t,i){...},
  ...
])
//# sourceMappingURL=index.js.map
```

##### 特点：

source-map 不能为模块和需要重新生成的代码块缓存SourceMaps，它适用于生产环境。



### inline-source-map

为每一个文件添加 sourcemap 的 DataUrl，注意这里的文件是打包前的每一个文件而不是最后打包出来的，同时这个 DataUrl 是包含一个文件完整 souremap 信息的 Base64 格式化后的字符串，而不是一个 url

##### 形式：

```javascript
webpackJsonp([1],[
  function(e,t,i){...},
  function(e,t,i){...},
  function(e,t,i){...},
  function(e,t,i){...},
  ...
])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9...
```

##### 特点：

可以看到末尾的注释 sourceMap 作为 DataURL 的形式被内嵌进了 bundle 中，由于 sourceMap 的所有信息都被加到了 bundle 中，整个 bundle 文件变得硕大无比。



### eval-source-map

这个就是把 `eval` 的 sourceURL 换成了完整 souremap 信息的 DataUrl

##### 形式：

```javascript
webpackJsonp([1],[
  function(module,exports,__webpack_require__){
    eval(
      ...
      //# sourceMappingURL=data:application/json;charset=utf-8;base64,...
    )
  },
  function(module,exports,__webpack_require__){
    eval(
      ...
      //# sourceMappingURL=data:application/json;charset=utf-8;base64,...
    )
  },  
  function(module,exports,__webpack_require__){
    eval(
      ...
      //# sourceMappingURL=data:application/json;charset=utf-8;base64,...
    )
  },
  ...
]);
```

##### 特点：

结合了eval和source-map的特点，eval将每个模块包起来，并且最后添加source-map的base64信息，可以知道行列，可以为模块缓存它可以更快的重建SourceMaps。



### cheap-source-map

不包含列信息，不包含 loader 的 sourcemap，（譬如 babel 的 sourcemap）

##### 特点：

不包含行信息，会减小map大小，不支持loader的sourcemap，比如从jsx映射到js，最终你只能访问到js文件，看不了源码的jsx文件。



### cheap-module-source-map

不包含列信息，同时 loader 的 sourcemap 也被简化为只包含对应行的。最终的 sourcemap 只有一份，它是 webpack 对 loader 生成的 sourcemap 进行简化，然后再次生成的。

##### 特点：

相较于cheap-source-map，可以支持loader的sourcemap



### hidden-source-map

和 source-map 一样，但不会在 bundle 末尾追加注释.

##### 形式：

```javascript
webpackJsonp([1],[
  function(e,t,i){...},
  function(e,t,i){...},
  function(e,t,i){...},
  function(e,t,i){...},
  ...
])
```

##### 特点：

与 source-map 相比少了末尾的注释，但 output 目录下的 `index.js.map` 没有少



> 注1：webpack 不仅支持这 7 种，而且它们还是可以任意组合上面的 eval、inline、hidden 关键字，就如文档所说，你可以设置 souremap 选项为 cheap-module-inline-source-map。
>
> 注2：如果你的 modules 里面已经包含了 SourceMaps ，你需要用 [source-map-loader](https://github.com/webpack/source-map-loader)来和合并生成一个新的 SourceMaps 



## 调试

github上关于调试的问题：[Source Maps don't work on Chrome](https://github.com/webpack/webpack/issues/2145)

##### 个人实测：

chrome里能否调试源码  x：不行  o：可以

eval-source-map  x(刷新断点被忽略)

cheap-source-map  x(不是源码)

cheap-module-eval-source-map x(刷新断点被忽略)

cheap-module-source-map  x(断点位置不对)

source-map  o

inline-source-map o



### 总结

eval： 更快

inline：内联

cheap：不含列信息，不支持loader sourcemap（譬如 babel 的 sourcemap，从jsx到js的映射）

cheap-module：不含列信息，支持loader sourcemap

source-map：包含行列信息，支持loader sourcemap
