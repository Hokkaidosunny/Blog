---
title: 实现electron-tunnel
date: 2017-07-16 20:29:01
tags: electron
---

##项目连接
[github链接(electron-tunnel)](https://github.com/Hokkaidosunny/electron-tunnel)

# Motivition

* 无需区分进程。如果想一套代码同时能跑在web环境和electron环境中，就需要在代码中先判断环境，再分别写对应的逻辑。每次写到electron环境下的逻辑，又要区分渲染进程和主进程，因为有些事只能渲染进程做，有些事只能主进程做。所以，我希望能将这些抽象出来，某个方法，只能在electron环境下被调用，并且不需要关心在什么进程下，web只要判断环境，调不同的方法就行，不需要关心和electron的交互。
* 快速迭代。如果需要快速的开启另一个electron的项目，我希望我web里的代码能轻易的获取到electron的能力，而不是重新开始编写，这个时候，我希望有一层对electron能力的封装。
* 团队合作。团队内有些成员对web很熟悉，但是对electron不是很了解，如果能有一个库列出了所有electron能做的事，你只需要调用，无需关心它是怎么实现的，能很大程度提高开发效率。



# Goals

1. 给web注入适当的环境变量，让web知道自己的环境
2. 给web注入一个对象，包含所有electron能做的事（包括主进程、渲染进程）


# How to do

在load web页面的时候，有个webPreferences配置，我们在这里预加载一个js文件，就是electron-bridge.js

这个文件拥有node的能力，并且它是属于渲染进程的，所以它能做渲染进程里的事, 也能跟主进程通讯。


# Let's do it

### 给web注入适当的环境变量

1. 加载bridge.js

```javascript
win = new BrowserWindow({
  width: 800,
  height: 600,
  show: false,
  webPreferences: {
    preload: path.join(__dirname, '../bridge/bridge.js'),
    plugins: true
  }
});
```

2. 当我们启动electron的时候，主进程开始通知这个渲染进程，给渲染进程注入主进程的环境变量，再有渲染进程挂载到window对象上，这样web就能获取自己的环境信息

```javascript
//bridge.js

const {ipcRenderer} = require('electron');

//监听主进程，设置环境变量
ipcRenderer.on('set-env', (event, msg) => {
  for (const key in msg) {
    window[key] = msg[key];
  }
});

```

```javascript
//main.js
const {BrowserWindow, ipcMain} = require('electron');

const win = new BrowserWindow({...});

//获取创建好的window对象发送消息
win.webContents.on('did-finish-load', function() {
  win.webContents.send('set-env', { //设置web环境变量
    __ELECTRON__: true,
    __DEV__: true,
    __PRO__: false,
    __SERVER__: false,
    windowLoaded: true
  });
});
```

##  通过bridge.js 来调用主进程的方法

3. 我们通过ipcRender给主进程发送一系列消息，包括做什么事情(eventName), 根据哪些参数（params），对外根据不同的事件暴露不同的方法，接受参数，和回调函数。

* 先将回调函数放在 eventsMap上暂存起来，因为ipcRender不能发送函数，所有的信息会被序列化后再发送给主进程，所以，我们先生成一个时间戳，让 eventsMap[时间戳] = cb 并把时间戳一同发送过去，等一会儿，主进程通知渲染进程调用哪个时间戳函数
* 通过'resist-event'频道,  发送参数，包括  eventName、params、timeStamp

```javascript
//bridge.js
const {ipcRenderer} = require('electron');

const eventsMap = {};

//调用原生事件
function registEvent(eventName, params, cb) {
  //允许只传两个数据
  if (!cb) {
    cb = params;
    params = {};
  }

  //如果win还未ready
  if (!windowLoaded) {
    cb(new Error('window not ready'));
    return;
  }

  const stamp = String(new Date().getTime());
  const opts = Object.assign({eventName}, params, {stamp});
  eventsMap[stamp] = cb; //注册唯一函数
  ipcRenderer.send('regist-event', opts); //发送事件
}

//进入全屏
function setFullScreen(cb) {
  registEvent(SET_FULL_SCREEN, cb);
}

window.ElectronBridge = {
  setFullScreen
};
```

4. 主进程监听‘resist-event’频道，做对应的事。我们会将所有主进程能做的事，放在eventsList对象下，当接受到渲染进程的通知，去eventsList找有没有对应的事能做，有，做完通过promise，或者通过回调函数，去在‘fire-event’频道通知，渲染进程，事情已经做完，并把数据传回去，包括 stamp(之前渲染进程传过来的，现在传回去，告诉渲染进程执行哪个回调函数) 、 payload(返回数据) 、err (错误信息)

```javascript
//main.js
const {ipcMain} = require('electron');

//监听对原生的调用
ipcMain.on('regist-event', (event, arg) => {
  const nativeEvent = eventsList[arg.eventName];
  if (nativeEvent) {
    const result =  nativeEvent(app, win, arg.params);
    if (isPromise(result)) {
      result.then(res => {
        event.sender.send('fire-event', {
          stamp: arg.stamp,
          payload: res
        });
      }).catch(err => {
        event.sender.send('fire-event', {
          stamp: arg.stamp,
          err
        });
      });
    } else {
      event.sender.send('fire-event', {
        stamp: arg.stamp,
        payload: result
      });
    }
  } else {
    event.sender.send('fire-event', {
      stamp: arg.stamp,
      err: new Error('event not support')
    });
  }
});
```

5. 渲染进程监听‘fire-event’执行对应时间戳回调函数，并把主进程传过来的数据传给回调函数。触发完成后，删掉该回调函数。

```javascript
//bridge.js

//触发事件回调
ipcRenderer.on('fire-event', (event, arg) => {
  const cb = eventsMap[arg.stamp];
  if (cb) {
    if (arg.err) {
      cb(arg.err, arg.payload);
    } else {
      cb(false, arg.payload);
    }
    delete eventsMap[arg.stamp];
  }
});
```

6. 如果是渲染进程能做的事，就不需要再和主进程通讯，可以直接完成触发回调

```javascript
//bridge.js
const {webFrame} = require('electron');
//设置缩放比，只能在渲染进程中实现
function setZoomFactor(params, cb) {
  webFrame.setZoomFactor(params);
  cb && cb();
}

window.ElectronBridge = {
  setZoomFactor
};
```

7. 最终web中的js代码去调用bridge.js暴露出来的方法

```javascript
// ../web/index.js

$btn1.addEventListener('click', function() {
  if (__ELECTRON__ && ElectronBridge) { //electron 环境
    ElectronBridge.setFullScreen((err) => {
      if (err) return;
      console.log('done');
    });
  } else { //web 环境
    alert('不能设置全屏')
    //do something else
  }
});
```
