---
title: React优秀实践
date: 2017-07-16 01:06:13
tags: react
---

### stateless component
* 多写 stateless component
* 性能更好

### react-redux
* 使用connect将组件直接与state关联
* 避免中间组件的重复渲染
* 父组件不再需要关心子组件需要的数据

### 将逻辑放在action中而不是reducer中
* action可以通过react-thunk处理异步的事情，reducer不行
* action有获取全部state的能力，如果这个action需要其他地方的数据，reducer只能获取当前节点的
* action通过react-thunk可以触发多个其他的action

### immutableJS
* 用来应对复制的数据结构

### redux-actions
* 创建标准化的 action 数据结构
* 第三方库的接入更容易
* 减少冗余代码

### reselect
* 将跟业务无关的数据操作逻辑放到selector中
* 同时可以起到缓存的左右， 避免重复渲染

### recompose
* 之于react的'lodash'
* 函数式react编程
