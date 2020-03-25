// TODO

# 概念

## 什么是修饰器

参考[修饰器](https://es6.ruanyifeng.com/?search=deco&x=0&y=0#docs/decorator)

## 什么是 metadata

metadata，简单来说，你可以给对象添加一些自定义的信息, 然后通过反射将这些信息提取出来, 这些信息是不会影响对象原本的结构的

## 什么是依赖注入

简单说，就是将所有模块扔到一个容器里，当一个模块运行依赖另一个模块的时候，从容器里取出依赖模块，而不是直接引用.

举个例子

```javascript
// 这里 c 依赖 a,b 文件是硬编码，修改维护麻烦

// a.js
export const a = {
  value() {
    return 1
  }
}

// b.js
export const b = {
  value() {
    return 2
  }
}

// c.js
import { a } from './a'
import { b } from './b'

export function add() {
  return a.value() + b.value()
}

/**
 * 实现一个最简单的依赖注入
 * c模块不再硬编码依赖 a,b 文件
 * 传进c模块的的 a,b 模块只要实现value方法，c模块就能正常使用
 */

// module.js
const modules = {}

export function register(k, v) {
  modules[k] = v
}

export function getModule(k) {
  return modules[k]
}

// a.js
const a = {
  value() {
    return 1
  }
}

register('param_a', a)

// b.js
const b = {
  value() {
    return 1
  }
}

register('param_b', b)

// c.js
export function add() {
  const a = getModule('param_a')
  const b = getModule('param_b')

  return a.value() + b.value()
}
```

# 在 TypeScript 中可以基于上面说的修饰器、metadata 优雅的实现依赖注入机制

## 安装 reflect-metadata

```
npm i reflect-metadata
```

## tsconfig.json 中打开 emitDecoratorMetadata, experimentalDecorators

给源码里的装饰器声明加上设计类型元数据。查看 [issue #2577](https://github.com/Microsoft/TypeScript/issues/2577) 了解更多信息。

Type metadata uses the metadata key "design:type". // 描述该属性是什么类型
Parameter type metadata uses the metadata key "design:paramtypes". // 该属性如果是函数的话，参数是什么类型
Return type metadata uses the metadata key "design:returntype". // 该属性如果是函数的话，返回值是什么类型

## 怎么使用

现在我们可以通过修饰器给 add 方法添加一些元属性，比如加个属性叫：design:name, 值：xx
接着我们可以通过 Reflect.getMetadata 获取实例 add 方法上的这个属性的值

```javascript
import 'reflect-metadata'

class A {
  @Reflect.metadata('design:name', 'xx')
  add(x: number, y: number): number {
    return x + y
  }
}

const ins = new A()
const paramTypes = Reflect.getMetadata('design:name', ins, 'add')

console.log(paramTypes) // 'xx'
```

编译后

```javascript
'use strict'
// ... 省略一些util方法
require('reflect-metadata')
var A = /** @class */ (function() {
  function A() {}
  A.prototype.add = function(x, y) {
    return x + y
  }
  __decorate(
    [
      Reflect.metadata('design:name', 'xx'),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Number, Number]),
      __metadata('design:returntype', Number)
    ],
    A.prototype,
    'add',
    null
  )
  return A
})()
var ins = new A()
var paramTypes = Reflect.getMetadata('design:name', ins, 'add')
console.log(paramTypes)
//# sourceMappingURL=index.js.map
```
