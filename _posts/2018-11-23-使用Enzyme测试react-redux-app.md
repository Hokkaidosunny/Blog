---
layout: post
title: 使用Enzyme测试react-redux-app
date: 2018-11-23
tags: react
---

## 使用 Enzyme 测试 react-redux-app(接上一篇)

使用 enzyme+jest 可以很方便的来测试我们的 react 应用

## 测试需要关注哪些方面

-  页面的结构的测试（一般是去  判断 dom 结构对不对）
- 样式的测试（这个比较复杂，可能需要我们去截图对比，简单点的做法，就直接对比样式代码是否有变更，这个只对 inline-style 有效）
- 交互的测试（ 测试一些交互能否正常被触发）

### 安装依赖

```
yarn add -D enzyme enzyme-adapter-react-16 @types/enzyme @types/enzyme-adapter-react-16
```

### 设置启动文件

按照 enzyme 文档，测试前是需要做一些准备工作的， 所以我们在根目录下添加`test.setup.ts`

```javascript
// test.setup.ts
import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
```

同时修改`jest.config.js`文件

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupTestFrameworkScriptFile: '<rootDir>/test.setup.ts'
}
```

### 模拟浏览器环境

react 应用运行的时候是在浏览器环境，但是我们测试的时候是在 node 环境，所以需要我们模拟出浏览器环境才能正确的运行测试。之前的做法是在无头浏览器中跑测试代码，但现在我们有一个更好的、更轻量的方法，就是使用`jsdom`。

#### 安装 jsdom

```shell
yarn add -D jsdom @types/jsdom

# 顺带安装一下requestAnimation的模拟,react需要
yarn add -D raf
```

#### 修改`test.setup.ts`

```javascript
import 'raf/polyfill'
import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as jsdom from 'jsdom'

const { window } = new jsdom.JSDOM('<!doctype html><html><body></body></html>')

global.window = window
global.document = window.document

configure({ adapter: new Adapter() })
```

## 编写测试

###  测试简单的组件

我们先写一个测试文件测一个简单的组件`test/BtnBack.test.ts`

```javascript
/**
 * 返回按钮
 */
import * as React from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { win } from '../../util'

const BtnBack: React.SFC<ButtonProps> = props => (
  <Button onClick={win.goBack} {...props}>
    返回
  </Button>
)

export default BtnBack
```

```javascript
import * as React from 'react'
import { shallow } from 'enzyme'
import BtnBack from '../../src/components/BtnBack'
import { Button } from 'antd'

test('<BtnBack />', () => {
  const wrapper = shallow(<BtnBack />)

  // 这部分是 结构测试
  const props = wrapper.find(Button).props()

  expect(props.children).toEqual('返回')

  // 这部分是 交互测试
  global.window = {
    history: {
      back: jest.fn()
    }
  }

  wrapper.find(Button).simulate('click')

  expect(global.window.history.back).toBeCalled()
})
```

done! 是不是很简单。

### 测试 connected 组件

测试 connected 组件有两种方法。

- 一种是使用[dive](https://airbnb.io/enzyme/docs/api/ShallowWrapper/dive.html)方法，dive 能剥离  第一层组件，返回 connected 组件里第一个非 dom 的 child-node，也就是我们自己写的组件，然后就像测一个简单组件一样去测  这个组件。当然，测试的时候需要模拟出 connected 产生的一些 props。
- 另一种就是模拟出 redux-store，我用的是这种

#### 安装 mock-store

```
yarn add -D redux-mock-store @types/redux-mock-store
```

#### 编写测试

```javascript
import * as React from 'react'
import Selector from '../../src/components/Selector'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { Select } from 'antd'

const middlewares = []
const mockStore = configureStore(middlewares)

const initState = {
  dataList: [
    {
      value: 1,
      desc: '1'
    },
    {
      value: 2,
      desc: '2'
    }
  ]
}

const store = mockStore(initState)

test('loadActin: Function, dataSouce: any', () => {
  let count = 0

  const loadAction = () => {
    count++
    return {
      type: 'TEST'
    }
  }

  const wrapper = mount(
    <Selector
      loadAction={loadAction}
      statePicker={state => state.dataList}
      store={store}
    >
      {(dataSource, Option) => {
        return dataSource.map((e: any, i: number) => (
          <Option key={i} value={e.value}>
            {e.desc}
          </Option>
        ))
      }}
    </Selector>
  )

  // action 被调用
  expect(count).toBe(1)

  // 渲染出正确的option 数量
  const opts = wrapper.find(Select).prop('children') as any[]
  expect(opts.length).toBe(2)
}
```

done! 是不是也很简单。

### 其他例子

大部分测试情况，都能在 enzyme 的文档中找到例子，我这边只是简单的介绍一下，enzyme 如何使用。

### 测试覆盖率

测试覆盖率是评价测试一个很重要的指标，我们可以通过`yarn jest --coverage`生成测试报告，查看代码中没有被测试到的分支，一点点的提高测试覆盖率

## 最后

可能大部分项目碍于各种情况，时间不够，需求变化太快等等，放弃编写测试，全部交给测试人员去测。但是，写不写测试是一回事，会不会写测试是另一会事。
希望各位在这又收获了一点小知识。:)
