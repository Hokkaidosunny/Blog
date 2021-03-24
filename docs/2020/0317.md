# 手写 promise

> `2020-03-17` by `Saul Shen`

## 手写一个简单 promise

```javascript
const PENDING = 'pending'
const RESOLVE = 'resolve'
const REJECT = 'reject'

class Promise {
  constructor(executor) {
    this.resolvers = []
    this.rejecters = []
    this.status = PENDING
    this.value = null
    this.reason = null

    const onResolve = value => {
      if (this.status === PENDING) {
        this.status = RESOLVE
        this.value = value
        this.resolvers.forEach(fn => fn(value))
      }
    }

    const onReject = reason => {
      if (this.status === PENDING) {
        this.status = REJECT
        this.reason = reason
        this.rejecters.forEach(fn => fn(reason))
      }
    }

    /**
     * 可能会在promise中throw error
     * e.g.
     * new Promise(() => {
     *  throw new Error('xxx')
     * })
     */
    try {
      executor(onResolve, onReject)
    } catch (e) {
      onReject(e)
    }
  }

  /**
   * 需要返回一个新的promise才能被链式调用
   */
  then(onResolve, onReject) {
    /**
     * onResolve, onReject的返回值需要作为下一个then中onResolve, onReject的入参
     * onResolve, onReject可以return一个 promise或者其他值
     */
    function resolvePromise(v, resolve, reject) {
      if (v instanceof Promise) {
        v.then(resolve, reject)
      } else {
        resolve(v)
      }
    }

    return new Promise((resolve, reject) => {
      if (this.status === RESOLVE) {
        /**
         * 可能会在onResolve中throw error, 所以需要try
         * e.g.
         * then(v => {
         *  console.log(v)
         *  throw new Error('xxx')
         * })
         */
        try {
          resolvePromise(onResolve(this.value), resolve, reject)
        } catch (e) {
          reject(e)
        }
      }

      // 同Resolve状态处理一致
      if (this.status === REJECT) {
        try {
          resolvePromise(onReject(this.reason), resolve, reject)
        } catch (e) {
          reject(e)
        }
      }

      /**
       * 同resolve状态类似，只不过需要先变成函数缓存起来
       * 这个时候，value和reason不再从this拿，可以从入参拿到
       */
      if (this.status === PENDING) {
        if (onResolve) {
          const cb = value => {
            try {
              resolvePromise(onResolve(value), resolve, reject)
            } catch (e) {
              reject(e)
            }
          }

          this.resolvers.push(cb)
        }

        if (onReject) {
          const cb = reason => {
            try {
              resolvePromise(onReject(reason), resolve, reject)
            } catch (e) {
              reject(e)
            }
          }

          this.rejecters.push(cb)
        }
      }
    })
  }

  catch(onReject) {
    return this.then(null, onReject)
  }
}

/**
 * for test
 */
new Promise(resolve => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
  .then(v => {
    console.log(v)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2)
      }, 1000)
    })
  })
  .then(v => {
    console.log(v)
    return 3
  })
  .then(v => {
    console.log(v)
    throw new Error('xxx')
  })
  .catch(e => {
    console.log(e)
  })
```

## 实现 Promise.resolve, Promise.all, Promise.race

```javascript
class Promise {
  static resolve(v) {
    return new Promise(resolve => {
      resolve(v)
    })
  }

  static all(arr) {
    let count = 0
    const resArr = []

    return new Promise((resolve, reject) => {
      arr.forEach((p, i) => {
        p.then(v => {
          count++
          resArr[i] = v

          if (count === arr.length) {
            resolve(resArr)
          }
        }, reject)
      })
    })
  }

  static race(arr) {
    return new Promise((resolve, reject) => {
      arr.forEach(p => {
        p.then(resolve, reject)
      })
    })
  }
}
```
