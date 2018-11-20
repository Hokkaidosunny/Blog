---
title: npm常用技巧
date: 2017-07-30 23:33:59
tags: npm
---

### 常用命令
```shell
npm i --registry=http://10.21.200.55:7001  #单次使用私有源

npm list -g --depth=0    #查看全局包列表,不考虑依赖

npm config ls -l    #查看npm配置

npm i node-sass@1.0.0    #安装指定版本的包

npm update node-sass    #更新包

npm search node-sass    #搜索一个包是否存在

npm cache clean    #清理本地包缓存

npm init --yes    #快速创建一个package.json

npm install -g npm    #更新npm

npm publish <本地路径>    #发布包

npm outdated     #查看包的版本状态

npm root -g #查看全局包位置
```

### 常用工具
* nrm 来管理镜像源
* npm-check 来检测更新包

### npm script
* 通过npm script可以直接调用本地可执行文件
* & 同时执行多个script; && 依次执行多个script
* 钩子:
```shell
prebuild    build的前置钩子  
build  
postbuild    build的后置钩子
```

### .npmrc
* `npm i` 的时候会去读取本地项目的rc文件，没有就读~目录
* 通过rc来解决安装包慢的问题
```shell
registry=https://registry.npm.taobao.org #设置淘宝镜像
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ #设置sass来源
phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs  
electron_mirror=http://npm.taobao.org/mirrors/electron/
```

### npm link的使用
* 在本地项目package1 下运行 npm link, 将本地包关联为全局包
* 在本地项目package1 下运行 npm unlink, 取消关联为全局包
* 在本地项目project 下运行 npm link package1，关联全局包刚刚link的package1
* 在project中，可以通过require('package1')来使用未发布的本地包

### npm设置代理
假设你的梯子在你本地机器上开启了一个第三方服务器 127.0.0.1:1080，只需按照下面的方法配置一下就能正常安装 node-sass 了
```
npm config set proxy http://127.0.0.1:1080
npm i node-sass
```
下载完成后删除 http 代理
```
npm config delete proxy
```
这样下来就能正常安装了

#### author: 沈帅佳
