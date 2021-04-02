/*
 * Description: 手写Promsie
 * Project Name: MyPromise
 * File Path: /MyPromise.js
 * File Created Date: 2021-04-02 14:22
 * Author: liux
 * -----
 * Last Modified: 2021-04-02 17:43
 * Modified By: liux
 * -----
 * HISTORY:
 */

// https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#note-4
// https://juejin.cn/post/6945319439772434469#heading-29

const MyPromise = (() => {
  const PENDING = 'pending'
  const FULFILLED = 'fulfilled'
  const REJECTED = 'rejected'

	/**
	 * 手写实现Promise方法
	 *
	 * @author liux
	 * @date 2021-04-03
	 * @class MyPromise
	 */
	class MyPromise {
    status = PENDING // 状态
    value = null // 成功返回的值
    reason = null // 失败返回的值
    onFulfilledCallbacks = [] // 存储成功回调函数组
    onRejectedCallbacks = [] // 存储失败回调函数组
    constructor(executor) {
      // 执行器，进入则会立即执行
      // 改变this指向当前实例，否则this会指向window或undefined
      try {
        executor(resolve.bind(this), reject.bind(this))
      } catch (error) {
        // 如果有错误，则执行reject
        reject.call(this, error)
      }

      function resolve(value) {
        // 只有状态是等待，才执行状态修改
        if (this.status === PENDING) {
          this.status = FULFILLED
          this.value = value
          // 判断成功回调是否存在，如果存在就调用
          while (this.onFulfilledCallbacks.length) {
            // 队列形式，从第一个回调开始执行，最终清空执行队列
            const cb = this.onFulfilledCallbacks.shift()
            cb(value)
          }
        }
      }

      function reject(reason) {
        // 只有状态是等待，才执行状态修改
        if (this.status === PENDING) {
          this.status = REJECTED
          this.reason = reason
          // 判断失败回调是否存在，如果存在就调用
          while (this.onRejectedCallbacks.length) {
            // 队列形式，从第一个回调开始执行，最终清空执行队列
            const cb = this.onRejectedCallbacks.shift()
            cb(reason)
          }
        }
      }
    }
		/**
		 * 实例方法 then
		 *
		 * @author liux
		 * @date 2021-04-03
		 * @param {*} onFulfilled
		 * @param {*} onRejected
		 * @returns 
		 * @memberof MyPromise
		 */
		then(onFulfilled, onRejected) {
      // 如果then中没有传参数，则使用默认函数
      const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
      const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

      const promise2 = new MyPromise((resolve, reject) => {
        const fulfilledQueueMicrotask = () => {
          // 创建一个微任务等待 promise2 完成初始化
          queueMicrotask(() => {
            try {
              // 获取成功回调结果
              const value = realOnFulfilled(this.value)
              resolvePromsie(promise2, value, resolve, reject)
            } catch (error) {
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
            } catch (error) {
              reject(error)
            }
          })
        }

        switch (this.status) {
          // 如果当前状态为FULFILLED，则立即执行
          case FULFILLED:
            fulfilledQueueMicrotask()
            break; // ！！！不要忘记加break，不然就会继续执行下一个case
          case REJECTED:
            rejectedQueueMicrotask()
            break;
          case PENDING:
            // 在等待状态时，先将成功和失败回调保存，等执行完成后再传递
            this.onFulfilledCallbacks.push(fulfilledQueueMicrotask)
            this.onRejectedCallbacks.push(rejectedQueueMicrotask)
            break;
        }
      })

      return promise2
    }
		/**
		 * 实例方法 catch
		 *
		 * @author liux
		 * @date 2021-04-03
		 * @param {*} onRejected
		 * @returns MyPromise
		 * @memberof MyPromise
		 */
		catch(onRejected) {
      return this.then(null, onRejected)
    }
		/**
		 * 实例方法 finally
		 *
		 * @author liux
		 * @date 2021-04-03
		 * @param {function} cb
		 * @returns 
		 * @memberof MyPromise
		 */
		finally(cb) {
      return this.then(
        value => MyPromise.resolve(cb()).then(() => value),
        reason => MyPromise.resolve(cb()).then(() => { throw reason })
      )
    }
		/**
		 * 静态方法 resolve
		 *
		 * @author liux
		 * @date 2021-04-03
		 * @static
		 * @param {*} value
		 * @returns 
		 * @memberof MyPromise
		 */
		static resolve(value) {
			// 如果入参是一个MyPromise，则直接返回它
      if (value instanceof MyPromise) {
        return value
      }
			// 否则将其包装成MyPromise实例返回
      return new MyPromise((resolve) => {
        resolve(value)
      })
    }
		/**
		 * 静态方法 reject
		 *
		 * @author liux
		 * @date 2021-04-03
		 * @static
		 * @param {*} reason
		 * @returns 
		 * @memberof MyPromise
		 */
		static reject(reason) {
      return new MyPromise((_, reject) => {
        reject(reason)
      })
    }
		/**
		 * 静态方法 all
		 * https://es6.ruanyifeng.com/#docs/promise#Promise-all
		 *
		 * @author liux
		 * @date 2021-04-03
		 * @static
		 * @param {array} [promiseQueues=[]]
		 * @returns 
		 * @memberof MyPromise
		 */
		static all(promiseQueues = []) {

      return new MyPromise((resolve, reject) => {
				// 判断入参是否为数组
        if (!Array.isArray(promiseQueues)) {
          return reject(new TypeError('arguments must be an array'))
        }

        let resolvedCounter = 0
        const promiseCount = promiseQueues.length
        const result = new Array(promiseCount)

        if(promiseQueues === 0) return resolve(result)
				// 同时执行
        for (let i = 0; i < promiseCount; i++) {
          MyPromise.resolve(promiseQueues[i]).then(value => {
            resolvedCounter++
						// 依次返回结果
            result[i] = value
						// 只有当所有结果都为 FULFILLED状态时，才返回resolve
            if (resolvedCounter == promiseCount) {
              resolve(result)
            }
						// 否则只要有一个是REJECTED状态，则返回对应的reject
          }, reject)
        }
      })
    }
		/**
		 * 静态方法 race
		 * https://es6.ruanyifeng.com/#docs/promise#Promise-race
		 *
		 * @author liux
		 * @date 2021-04-03
		 * @static
		 * @param {array} [promiseQueues=[]]
		 * @returns 
		 * @memberof MyPromise
		 */
		static race(promiseQueues = []) {
			return new MyPromise((resolve, reject) => {
				// 判断入参是否为数组
				if (!Array.isArray(promiseQueues)) {
					return reject(new TypeError('arguments must be an array'))
				}

				const promiseCount = promiseQueues.length

				if(promiseCount === 0) return resolve()

				for(let i = 0; i < promiseCount; i++) {
					// 只要其中有一个改变了状态，则直接返回该状态
					MyPromise.resolve(promiseQueues[i]).then(resolve, reject)
				}
			})
		}
		/**
		 * 静态方法 allSettled
		 * https://es6.ruanyifeng.com/#docs/promise#Promise-allSettled
		 * 
		 * @author liux
		 * @date 2021-04-03
		 * @static
		 * @param {array} [promiseQueues=[]]
		 * @returns 
		 * @memberof MyPromise
		 */
		static allSettled(promiseQueues = []) {
			return new MyPromise((resolve, reject) => {
				// 判断入参是否为数组
        if (!Array.isArray(promiseQueues)) {
          return reject(new TypeError('arguments must be an array'))
        }

        let executeCounter = 0
        const promiseCount = promiseQueues.length
        const result = new Array(promiseCount)

        if(promiseQueues === 0) return resolve(result)
				// 同时执行
        for (let i = 0; i < promiseCount; i++) {
          MyPromise.resolve(promiseQueues[i]).then(value => {
						executeCounter++
            result[i] = { status: FULFILLED, value }
						if(executeCounter === promiseCount) {
							resolve(result)
						}
          }, reason => {
						executeCounter++
						result[i] = { status: REJECTED, reason }
						if(executeCounter === promiseCount) {
							resolve(result)
						}
					})
        }
      })
		}
		/**
		 * ES2021新引入方法 any
		 * https://es6.ruanyifeng.com/#docs/promise#Promise-any
		 * 
		 * @author liux
		 * @date 2021-04-03
		 * @static
		 * @param {*} [promiseQueues=[]]
		 * @returns 
		 * @memberof MyPromise
		 */
		static any(promiseQueues = []) {
			return new MyPromise((resolve, reject) => {
				// 判断入参是否为数组
        if (!Array.isArray(promiseQueues)) {
          return reject(new TypeError('arguments must be an array'))
        }

        let executeCounter = 0
        const promiseCount = promiseQueues.length
        const errResult = new Array(promiseCount)

        if(promiseQueues === 0) return resolve(result)
				// 同时执行
        for (let i = 0; i < promiseCount; i++) {
					// 只要有一个状态为FULFILLED状态时，返回resolve
          MyPromise.resolve(promiseQueues[i]).then(resolve, reason => {
						executeCounter++
						errResult[i] = new Error(reason)
						// 如果都是REJECTED状态，则抛出reject，并返回特殊的AggregateError错误
						if(executeCounter === promiseCount) {
							// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AggregateError
							reject(new AggregateError(errResult, 'All promises were rejected'))
						}
					})
        }
      })
		}

  }

  function resolvePromsie(promise, value, resolve, reject) {
    // 假如return出的是自己，则抛出错误
    // https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#x-%E4%B8%8E-promise-%E7%9B%B8%E7%AD%89
    if (promise === value) {
      return reject(
        new TypeError('Chaining cycle detected for promise #<Promise>')
      )
    }
    // https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#x-%E4%B8%BA%E5%AF%B9%E8%B1%A1%E6%88%96%E5%87%BD%E6%95%B0
    if (typeof value === 'object' || typeof value === 'function') {
      if (value == null) {
        // 如果为null则直接返回
        return resolve(value)
      }

      let then
      try {
        then = value.then
      } catch (error) {
        // 如果取 value.then 的值时抛出错误 error，则以 error 为据因拒绝 promise
        return reject(error)
      }

      if (typeof then === 'function') {
        let called = false
        try {
          then.call(
            value, // 将value作为this
            (y) => {
              // 第一个参数叫做 resolvePromise，如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
              // 如果 resolvePromise 和 rejectPromise 均被调用，
              // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
              // 实现这条需要前面加一个变量 called
              if (called) return
              called = true
              resolvePromsie(promise, y, resolve, reject)
            },
            (r) => {
              // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
              if (called) return
              called = true
              reject(r)
            }
          )
        } catch (error) {
          // 如果调用 then 方法抛出了异常 error
          // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
          if (called) return
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

  return MyPromise
	
})()

// 仅在测试中应用
MyPromise.deferred = function () {
  var result = {}
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve
    result.reject = reject
  })

  return result
}

module.exports = MyPromise

// export default MyPromise
