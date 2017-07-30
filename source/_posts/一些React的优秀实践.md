---
title: 一些React的优秀实践
date: 2017-07-16 01:06:13
tags: react
---

### connect写法

[讨论](https://github.com/reactjs/redux/issues/419)

> Are there other problems than tracing data flow when connect()-ing a lot of components? Would there be a performance penalty for example?
>
> 如果大量的使用connect除了追踪数据的问题外，会不会有性能上的损耗

> No, it's exactly the opposite: you get better performance by giving up top-down flow.
>
> 不会，相反，你会有更好的性能表现，通过放弃这种之上而下的数据流

> Because you can avoid unnecessary re-renders of middle-level components?
>
> 因为你可以避免许多不必要的中间组件的重复渲染

* 避免中间组件的重复渲染
* 父组件不再需要关心子组件需要的数据

```javascript
import action1 form './actioin1.js';

//type 1
function mapStateToProps(state) {
  return {
    a: state.a
  };
}

export default connect(mapStateToProps, {
  action1
})(ClassNotification);



//type2
function mapStateToProps(state) {
  return {
    a: state.a
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action1: () => dispatch(action1)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassNotification);

```





### 容器组件和展示组件

Redux 的 React 绑定库是基于 [容器组件和展示组件相分离](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 的开发思想。所以建议先读完这篇文章再回来继续学习。

已经读完了？那让我们再总结一下不同点：

|            | 展示组件           | 容器组件               |
| ---------- | -------------- | ------------------ |
| 作用         | 描述如何展现（骨架、样式）  | 描述如何运行（数据获取、状态更新）  |
| 直接使用 Redux | 否              | 是                  |
| 数据来源       | props          | 监听 Redux state     |
| 数据修改       | 从 props 调用回调函数 | 向 Redux 派发 actions |
| 调用方式       | 手动             | 通常由 React Redux 生成 |

大部分的组件都应该是展示型的，但一般需要少数的几个容器组件把它们和 Redux store 连接起来。

技术上讲你可以直接使用 `store.subscribe()` 来编写容器组件。但不建议这么做因为就无法使用 React Redux 带来的性能优化。也因此，不要手写容器组件，都是使用 React Redux 的 `connect()` 方法来生成，后面会详细介绍.



### Do *more* in action-creators and *less* in reducers

[讨论](https://github.com/reactjs/redux/issues/1171)

> 我之前的观点：Action 只做简单的参数传递和配置，最多做一些数据格式的转换，例如：把 date 转成 formatted string。尽量把数据处理的逻辑放在reducer中。因为按照语意，action 就只是一个 identifier，reducer 才是负责逻辑处理的。

* action可以通过react-thunk处理异步的事情，reducer不行
* action有获取全部state的能力，如果这个action需要其他地方的数据，reducer只能获取当前节点的
* action通过react-thunk可以触发多个其他的action



### 是否需要ImmutableJS

>IMO with new JS syntax it's not so much useful to use ImmutableJS anymore as you can easily modify lists and objects with normal JS. Unless you have very large lists and objects with lots of properties and you need structural sharing for performance reasons ImmutableJS is not a strict requirement.
>
>新的语法已经够用了，除非你的state结构很复杂，或者为了提高性能

> The primary reasons for using Immutable (in my eyes) aren't performance or syntactic sugar for updates. The primary reason is that it prevents you (or someone else) from *accidentally* mutating your incoming state within a reducer. That's a no-no and it's unfortunately easy to do with plain JS objects.
>
> 并不是为了语法题或者性能原因使用，而是为了防止别人意外的改掉了state的某个属性，原生js很容易发生这种情况


### 怎么写action

使用`redux-actions`来创建标准化的 action 数据结构

* 可以让维护更容易
* 第三方库的接入更容易
* 减少冗余代码



### action type写在哪

> 一个约定俗成的做法是，action 拥有一个不变的 type 帮助 reducer (或 Flux 中的 Stores ) 识别它们。我们建议你使用 string 而不是 [符号（Symbols）](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 作为 action type ，因为 string 是可序列化的，并且使用符号会使记录和重演变得困难。
>
> 在 Flux 中，传统的想法是将每个 action type 定义为 string 常量：
>
> ```
> const ADD_TODO = 'ADD_TODO';
> const REMOVE_TODO = 'REMOVE_TODO';
> const LOAD_ARTICLE = 'LOAD_ARTICLE';
> ```
>
> 这么做的优势是什么？**人们通常声称常量不是必要的。对于小项目也许正确。** 对于大的项目，将 action types 定义为常量有如下好处：
>
> - 帮助维护命名一致性，因为所有的 action type 汇总在同一位置。
> - 有时，在开发一个新功能之前你想看到所有现存的 actions 。而你的团队里可能已经有人添加了你所需要的action，而你并不知道。
> - Action types 列表在 Pull Request 中能查到所有添加，删除，修改的记录。这能帮助团队中的所有人及时追踪新功能的范围与实现。
> - 如果你在 import 一个 Action 常量的时候拼写错了，你会得到 `undefined` 。在 dispatch 这个 action 的时候，Redux 会立即抛出这个错误，你也会马上发现错误。
>
> 你的项目约定取决与你自己。开始时，可能在刚开始用内联字符串（inline string），之后转为常量，也许再之后将他们归为一个独立文件。Redux 在这里没有任何建议，选择你自己最喜欢的。

将所有type放在一个文件里

* 方便团队内的其他成员浏览，判断是否有重复



### action拆分

action按页面，拆分成多个文件夹，文件夹中每个文件包含一个复杂的action, 或者多个简单的action

* 结构清晰好维护
* 避免引入无效的action
* 可以对container做了哪些事有直观的了解



### 绑定this

> If calling `bind` annoys you, there are two ways you can get around this. If you are using the experimental [property initializer syntax](https://babeljs.io/docs/plugins/transform-class-properties/), you can use property initializers to correctly bind callbacks:

```javascript
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```


### 使用Reselect(todo)

* state保存最小数据，通过selector来拼装数据
* 避免重复调用mapStateToProps
* 缓存上次的结果

### 使用redux-observable(todo)

* 优雅的执行异步action
