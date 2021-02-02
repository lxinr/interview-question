/*
 * Description: 实现一个Event
 * Project Name: src
 * File Path: /自定义Event.js
 * File Created Date: 2021-02-01 16:32
 * Author: liux
 * -----
 * Last Modified: 2021-02-01 16:32
 * Modified By: liux
 * -----
 * HISTORY:
 */

// 发布订阅模式
/**
* 
 使用 ECMAScript（JS）代码实现一个事件类Event ，包含下面功能：绑定事件、解绑事件和派发事件。

  on(eventName, func): 可注册多个事件，允许相同，且事件遵循先进先出原则，监听 eventName事件， 事件触发的时候调用 func函数
  once(eventName, func): 事件仅能注册一次
  emit(eventName, arg1, arg2, arg3,arg4...) : 触发eventName 事件, 并且把参数 arg1, arg2, arg3,arg4...传给事件处理函数
  off(eventName, func) : 停止监听某个事件，根据func的引用是否匹配来移除对应事件的监听
*
 */

function noop(){}

function isFunction(cb) {
  return Object.prototype.toString.call(cb) === '[object Function]'
}

class EventBus {
  constructor() {
    this._event = new Map()
  }

  _isFunction(cb) {
    return Object.prototype.toString.call(cb) === '[object Function]'
  }

  // 可注册多个事件，允许相同，且事件遵循先进先出原则
  on(eventName = '', callback = noop) {
    console.log('on----', eventName, this)
    if(!eventName) return this
    if(callback && !isFunction(callback)) {
      throw Error(`${callback} is not a function`)
    }
    const fns = this._event.get(eventName) || []
    this._event.set(eventName, [...fns, callback])

    return this
  }
  // 事件仅能注册一次
  once(eventName = '', callback = noop) {
    if(this._event.has(eventName)) return this
    if(callback && !isFunction(callback)) {
      throw Error(`${callback} is not a function`)
    }
    this._event.set(eventName, [callback])
    
    return this
  }
  // 事件触发
  emit(eventName = '', ...args) {
    const fns = this._event.get(eventName)
    if(!fns) return this
    for(const fn of fns) {
      fn.apply(this, args)
    }

    return this
  }
  // 
  off(eventName = '', callback) {
    const fns = this._event.get(eventName)
    if(!fns) return this
    if(callback && !isFunction(callback)) {
      throw Error(`${callback} is not a function`)
    }
    
    const filterFns = fns.filter(fn => fn !== callback)
    if(!filterFns.length) {
      this._event.delete(eventName)
    } else {
      this._event.set(eventName, filterFns)
    }

    return this
  }
}

const ev = new EventBus()

console.log('_isFunction---', ev._isFunction(function(){}))

const vfn = function() {
  console.log('v---vvv---', this)
}

const e1 = ev.on('testv', function() {
  console.log('testv---|||-', arguments, this)
}).on('vvv', vfn)
// ev.on('testv', '6454')

ev.once('testv', function() {
  console.log('testv-2222-++++---', arguments)
})

ev.emit('testv', 1, 2, 3)

console.log('e----', e1)
ev.emit('vvv')

setTimeout(() => {
  ev.emit('testv', 5)
  ev.off('vvv', vfn)
}, 1000)

setTimeout(() => {
  // ev.off('testv', function)
  ev.emit('vvv')
  ev.emit('testv', 'fffff')
}, 1500)

// var ev = 'resize'

// window.addEventListener(ev, function() {
//   console.log('ev---1')
// })
// window.addEventListener(ev, function() {
//   console.log('ev---2')
// })
// window.addEventListener(ev, function() {
//   console.log('ev---3')
// })

// setTimeout(() => {
//   window.dispatchEvent(ev)
// }, 0)