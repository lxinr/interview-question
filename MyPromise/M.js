/**
 * 
 * const promise = new Promise((resolve, reject) => {
  resolve('success')
  reject('err')
})

promise.then(value => {
  console.log('resolve', value)
}, err => {
  console.log('error----', err)
})
 */

// https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#note-4

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  status = PENDING // 状态
  value = null // 成功返回的值
  reason = null // 失败返回的值
  onFulfilledCallbacks = [] // 存储成功回调函数组
  onRejectedCallbacks = [] // 存储失败回调函数组
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if(this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      // 判断成功回调是否存在，如果存在就调用
      while(this.onFulfilledCallbacks.length) {
        // 队列形式，从第一个回调开始执行，最终清空执行队列
        const cb = this.onFulfilledCallbacks.shift()
        cb(value)
      }
    }
  }

  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if(this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      // 判断失败回调是否存在，如果存在就调用
      while(this.onRejectedCallbacks.length) {
        // 队列形式，从第一个回调开始执行，最终清空执行队列
        const cb = this.onRejectedCallbacks.shift()
        cb(reason)
      }
    }
  }
  constructor(executor) {
    // 执行器，进入则会立即执行
    // 改变this指向当前实例，否则this会指向window或undefined
    try {
      executor(this.resolve, this.reject)
    } catch(error) {
      // 如果有错误，则执行reject
      this.reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

    const promise2 = new MyPromise((resolve, reject) => {

      const fulfilledQueueMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调结果
            const value = realOnFulfilled(this.value)
            resolvePromsie(promise2, value, resolve, reject)
          } catch(error) {
            reject(error)
          }
        })
      }

      const rejectedQueueMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调结果
            const value = realOnRejected(this.reason)
            resolvePromsie(promise2, value, resolve, reject)
          } catch(error) {
            reject(error)
          }
        })
      }

      // 如果当前状态为FULFILLED，则立即执行
      if(this.status === FULFILLED) {
        fulfilledQueueMicrotask()
      } else if(this.status === REJECTED) {
        rejectedQueueMicrotask()
      } else if(this.status === PENDING) {
        // 在等待状态时，先将成功和失败回调保存，等执行完成后再传递
        this.onFulfilledCallbacks.push(fulfilledQueueMicrotask)
        this.onRejectedCallbacks.push(rejectedQueueMicrotask)
      }
    })

    return promise2
  }

  static resolve(value) {
    if(value instanceof MyPromise) {
      return value
    }

    return new MyPromise(resolve => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason)
    })
  }
}

function resolvePromsie(promise, value, resolve, reject) {
  // 假如return出的是自己，则抛出错误
  // https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#x-%E4%B8%8E-promise-%E7%9B%B8%E7%AD%89
  if(promise === value) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#x-%E4%B8%BA%E5%AF%B9%E8%B1%A1%E6%88%96%E5%87%BD%E6%95%B0
  if(typeof value === 'object' || typeof value === 'function') {
    if(value == null) {
      // 如果为null则直接返回
      return resolve(value)
    }

    let then
    try {
      then = value.then
    } catch(error) {
      // 如果取 value.then 的值时抛出错误 error，则以 error 为据因拒绝 promise
      return reject(error)
    }

    // 如果 then 是函数
    if(typeof then === 'function') {
      let called = false
      try {
        then.call(
          value, // 将value作为this
          y => { // 第一个参数叫做 resolvePromise，如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if(called) return
            called = true
            resolvePromsie(promise, y, resolve, reject)
          },
          r => { // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
            if(called) return
            called = true
            reject(r)
          }
        )
      } catch(error) {
        // 如果调用 then 方法抛出了异常 error
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if(called) return
        reject(error)
      }
    } else {
      // 如果 then 不是函数，以 value 为参数执行 promise
      resolve(value)
    }
  } else {
    // 如果 value 不为对象或者函数，以 value 为参数执行 promise
    resolve(value)
  }
}

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}

module.exports = MyPromise