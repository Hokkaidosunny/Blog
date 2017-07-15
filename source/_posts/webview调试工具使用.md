---
title: webview调试工具使用
date: 2017-07-16 00:56:38
tags:
---
#### 本人工作平台mac，以下全部针对mac平台

## Charles

#### http抓包
* `proxy>proxy settings` 设置代理端口
* 手机设置代理连到端口上
* 手机里的所有请求都能被charles抓到

#### https抓包
* `proxy>SSL proxy settings` 设置要代理的域名，默认端口443
* `proxy>proxy settings` 设置代理端口
* 手机连到端口上
* 手机浏览器打开  
  https://charlesproxy.com/getssl  
  下载安装证书
* 接着可以访问配置域名的具体请求


#### 拦截请求，修改返回数据

* 连接上代理，访问页面
* 右击域名，点击breakpoints
* 再次访问页面
* charles会停留在返回数据界面，等待进一步操作

## Spy-debugger
spy-dbugger是一款一站式页面调试、抓包工具。使用方便，一行命令就能启动。详见[Spy-debugger](https://github.com/wuchangming/spy-debugger)

## safari调试ios webview

#### 调试iPhone浏览器页面
* iphone在`设置>safari>高级`里`web检查器`打开
* iphone连接mac
* iphone safari 随便打开一个页面
* 在mac safari `开发>xxx的iPhone`选项中，可以检查到iphone safari打开的页面，点开就可以对该页面进行进一步的调试。

#### 调试app webview
* 原材料：simulator、app、mac safari
* simulator在`设置>safari>高级`里`web检查器`打开
* 在xcode simulator中安装app，[如何在simulator安装app](http://taobaofed.org/blog/2015/11/13/web-debug-in-ios/)。我是直接拿到源码在xcode里build
* 这个时候在simulator打开app里的webview就会被mac safari检查到。
* safari在`开发>simulator`中，就能看见你打开的webview
* safari是默认支持surce map的，所以你还可以对源码进行断点调试
* （记得webpack devtool设置成为'source-map',如果是'cheap-module-source-map'或者其他设置，要么断点位置不对，要么就是直接看不到源码，这个涉及到不同devtool在不同浏览器中的表现，下次更）

## ios_webkit_debug_proxy
如果你觉得safari调试用的不习惯，还是喜欢chrome调试，就需要[ios-webkit-debug-proxy](https://github.com/google/ios-webkit-debug-proxy)

#### 安装启动
```shell
#安装
brew install ios-webkit-debug-proxy

#启动
ios_webkit_debug_proxy -f chrome-devtools://devtools/bundled/inspector.html
```
（note：启动的时候，要先打开simulator，再启动`ios-webkit-debug-proxy`）

#### 访问页面
* simulator打开一个app的webview
* chrome浏览器打开http://127.0.0.1:9221
* 点击要打开的页面
* 如果下方有'block'提示,点击页面后，去控制台再点击一下页面链接
* 如果页面没有出现，需要重启一下app，只有页面走网络传输的时候，才能被监听到，需要让页面再传输一次，被监听到
* 接下来就可以用你熟悉的调试界面查看webview了
