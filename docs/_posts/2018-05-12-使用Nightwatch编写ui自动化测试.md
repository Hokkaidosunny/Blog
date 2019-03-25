---
layout: post
title: 使用Nightwatch编写ui自动化测试
date: 2018-05-12 16:06:26 +0800
tags: test
---

### 介绍

Write End-to-End tests in Node.js quickly and effortlessly that run against a Selenium/WebDriver server.

### 安装 Nightwatch

```shell
# 在当前项目中安装
npm i -D nightwatch

# 或者全局安装
npm i -g nightwatch
```

### 安装 webDriver

Nightwatch 有两种方式去调起浏览器跑测试

1. 通过 Selenium，调各个浏览器的 webDriver 唤起浏览器。这个需要安装 java、Selenium、webDriver
2. 直接通过各家浏览器的 webDriver 调起对应的浏览器。

我选择了第二种，这里就需要去安装的 chrome 的 webDriver，有个 npm 包帮我们做了这个事

```shell
npm i -D chromedriver
```

安装的时候可能会遇到'网络问题'，在根目录下新建一个.npmrc 文件,指定一下下载路径

```shell
chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver
```

### 配置文件 nightwatch.json

Nightwatch 启动的时候默认会去加载 nightwatch.json 配置文件，nightwatch.js 也行，这里贴上我的配置文件，并对一些常用的字段做一下说明，其余看文档就行

```json
{
  "src_folders": ["test/ui"],
  "output_folder": "reports",
  "custom_commands_path": "",
  "custom_assertions_path": "",
  "page_objects_path": "",
  "globals_path": "./webDriver.js",

  "selenium": {
    "start_process": false
  },

  "test_settings": {
    "default": {
      "selenium_port": 9515,
      "selenium_host": "localhost",
      "default_path_prefix": "",

      "desiredCapabilities": {
        "browserName": "chrome",
        "chromeOptions": {
          "args": [
            "--no-sandbox",
            "user-data-dir=/Users/shenshuaijia/Library/Application Support/Google/Chrome"
          ]
        },
        "acceptSslCerts": true
      },
      "globals": {
        "domain": "http://xxx.com"
      }
    }
  }
}
```

- src_folders: 指定测试用例的文件夹，里面所有的 js 文件测试的时候都会被执行

- output_folder： 指定产生报告存放的路径

- globals_path： 全局模块路径，nightwatch 启动时还会去加载这个路径下的模块，比如我们刚刚下载了 Chromedriver，我们需要写个模块文件，简单包装一下暴露出来被 nightwatch 加载。 这是我根目录下的 webDriver.js 文件，这样的话，nightwatch 就能通过这个文件调 webdriver 然后启动浏览器了

  ```javascript
  const chromedriver = require('chromedriver')

  module.exports = {
    before: function(done) {
      chromedriver.start()
      done()
    },

    after: function(done) {
      chromedriver.stop()
      done()
    }
  }
  ```

- selenium： selenium 的配置，因为我选择了第二中安装方式，所以要禁用掉 selenium

- test_settings：启动测试时的一些配置，每一个 key 对应一套配置，比如通过命令`nightwatch --env default`使用 default 那一套配置，也可以用`nightwatch --env integration`来运行 integration 那套配置，但需要事先在 test_settings 中有配置

- desiredCapabilities：这个是对 Chromdriver 能力配置，具体的话，就需要查看 Chromdriver 的文档

  这里我遇到了一个比较特殊的情况，我需要使用平时使用 chrome 留下的 cookie，而不是完全的沙盒模式，所以，我这里需要启动 chromedriver 的时候，指定加载 chrome 用户数据的文件夹`"user-data-dir=/Users/shenshuaijia/Library/Application Support/Google/Chrome"`，这样所有的登录信息都能在测试的时候被使用。

- globals： 在测试的时候，也可以定义一下全局变量，方便测试的时候使用,这里我定义了一个 domain，写测试的时候可以在`browser.globals.domain`获取

### 编写测试

在`test/ui`文件夹下新建一个测试文件`page.test.js`

```javascript
module.exports = {
  'Demo test Google': function(browser) {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'nightwatch')
      .waitForElementVisible('button[name=btnG]', 1000)
      .click('button[name=btnG]')
      .pause(1000)
      .assert.containsText('#main', 'Night Watch')
      .end()
  }
}
```

nightwatch 拥有比较优雅的测试写法。这里就是简单打开一个谷歌页面，往输入框输入 nightwatch 然后点击按钮。记住所有的测试完成后需要调 end 方法来退出浏览量。nightwatch 也可以定义一些钩子函数

```javascript
module.exports = {
  before: function(browser) {
    console.log('Setting up...')
  },

  after: function(browser) {
    console.log('Closing down...')
  },

  beforeEach: function(browser) {},

  afterEach: function() {},

  'step one': function(browser) {
    browser
    // ...
  },

  'step two': function(browser) {
    browser
      // ...
      .end()
  }
}
```

### 运行测试

```
nightwatch
```

这里我遇到了一个奇怪的问题，可能是由于我指定了用户目录的关系，我需要先完全退出 chrome，在跑测试，不然跑测试新打开的窗口不会按代码里写的测试去走

### 总结

这里我只是简单介绍一下 nightwatch，更加详细具体的使用还是需要参考官方文档。有了 ui 自动化测试以后，我们可以简单的做一些回归测试，比如，改了某些代码以后，把所有的页面都跑一遍，看看控制台有没有报错，比点点点方便多了

​
