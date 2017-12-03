---
title: 写一手漂亮的js
date: 2017-12-03 17:15:19
tags: js
---


## 介绍
看了很多best practice，却没有人教我怎么去写一手漂亮的js代码，今天我来讲讲我自己写js的经验

### 不要在代码中留大段注释掉的代码
* 留给git去管理，不然你要git干嘛

```javascript
// bad

// function add() {
//   const a = b + c
//   return a
// }

function add() {
  return a + 1000
}

// good
function add() {
  return a + 1000
}
```

### 适当地换行

```javascript
// bad
function a() {
  const {
    state_a,
    state_b,
    state_c
  } = this.state
  this.setState({state_a: state_a * 2})
  return 'done'
}

// good
function a() {
  const {
    state_a,
    state_b,
    state_c
  } = this.state

  this.setState({state_a: state_a * 2})

  return 'done'
}
```

### 适当的添加注释，但不要疯狂的添加注释
* 对一段代码或者一行特别需要注意的代码注释
* 不要疯狂的注释，太啰嗦，漂亮的代码自己会说话

```javascript
// bad
const a = 'a' // 这是a
const b = 'b' // 这是b
const c = 'c' // 这是c

// good
/**
 * 申明变量
 */
 const a = 'a'
 const b = 'b'
 const c = 'c'
```

### 将类似行为、命名的代码归类在一起

```javascript

// bad
function handleClick(arr) {
  const a = 1

  arr.map(e => e + a)

  const b = 2

  return arr.length + b
}

// good
function handleClick(arr) {
  const a = 1
  const b = 2

  arr.map(e => e + a)

  return arr.length + b
}

```


### 在不破坏语义性的情况下，'能省则省'
* 牢记js中函数是一等公民
* 但如果省略到影响可读性了，就是失败的
* 在可读性和简洁性之间必须选一个的话，永远先选可读性

```javascript

function add(a) {
  return a + 1
}

function doSomething() {

}

// bad
arr.map(a => {
  return add(a)
})

setTimeout(() => {
  doSomething()
}, 1000)

// good
arr.map(add)

setTimeout(doSomething, 1000)

```

* 箭头函数

```javascript
// bad
const a = (v) => {
  return v + 1
}

// good
const a = v => v + 1


// bad
const b = (v, i) => {
  return {
    v,
    i
  }
}

// good
const b = (v, i) => ({v, i})


// bad
const c = () => {
  return (dispatch) => {
    // doSomething
  }
}

// good
const c = () => dispatch => {
  // doSomething
}

```

* 提前对对象取值(写react的同学一定懂)

```javascript
// bad
const a = this.props.prop_a + this.props.prop_b

this.props.fun()

// good
const {
  prop_a,
  prop_b,
  fun
} = this.props

const a = prop_a + prop_b

fun()
```

### 合理使用各种表达式
``` javascript
// bad
if (cb) {
  cb()
}

// good
cb && cb()


// bad
if (a) {
  return b
} else {
  return c
}

// good
return a ? b : c


// bad
if (a) {
  c = a
} else {
  c = 'default'
}

// good
c = a || 'default'
```

### 链式调用写法

```javascript
// bad
fetch(url).then(res => {
  return res.json()
}).then(() => {
  // doSomething
}).catch(e => {

})

// good
fetch(url)
  .then(res => {
    return res.json()
  })
  .then(() => {
    // doSomething
  })
  .catch(e => {

  })
```

### 保持代码是纵向发展的
* 发现那些在整个文件中特别'突出'的代码时，应该考虑对他们做换行处理了

```javascript
// bad
return handleClick(type, key, ref, self, source, props)

// good
return handleClick(
  type,
  key,
  ref,
  self,
  source,
  props
)

// bad
const a = this.props.prop_a === 'hello' ? <di>world</div> : null

// good
const a = this.props.prop_a === 'hello'
  ? <di>world</div>
  : null
```

## 总结
个人经验，如有错误，还望指正
