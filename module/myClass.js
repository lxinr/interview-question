/*
 * Description: 模拟实现class
 * Project Name: module
 * File Path: /myClass.js
 * File Created Date: 2021-02-26 14:05
 * Author: liux
 * -----
 * Last Modified: 2021-02-26 14:05
 * Modified By: liux
 * -----
 *
 *
 * HISTORY:
 */

// class Msg {
//   name = '';
//   age = 24;
//   constructor(options) {
//     this.name = options.name || ''
//     this.age = options.age || 24
//   }

//   get info() {
//     return `name is ${this.name}，age is ${this.age}`
//   }

//   static eat() {
//     return `${this.name} eat apple`
//   }

//   find() {
//     return '慢慢慢慢慢慢'
//   }
// }

function _classCallCheck(instance, Constructor) {
  // 检测instance 是否是 Constructor 的一个实例
  if (!(instance instanceof Constructor)) {
    // 如果不是，则抛出一个类型错误
    throw new TypeError('不能直接作为函数调用')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var prop = props[i]
    // 如果存在value，即表示为可写入的
    if ('value' in prop) prop.writable = true
    // configurable
    Object.defineProperty(target, prop.key, prop)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  // 如果是原型方法，其应该是挂载在原型上
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  // 如果是静态方法，则是直接挂载在构造函数上，静态方法不需要实例化该函数即可使用
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _inherits(subClass, superClass) {
  // 判断父类是否是符合要求的
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  // 让子类继承父类的公有方法
  // Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
  // 大致为 
  // subClass.prototype = Object.create(superClass.prototype）
  // subClass.prototype。constructor = subClass
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  })
  // 让子类继承父类的静态方法，即subClass.__proto__ = superClass
  if (superClass) Object.setPrototypeOf(subClass, superClass)
}

var Parent = (function () {
  'use strict' // 类声明和类表达式的主体都执行在严格模式下'
  function Parent(options) {
    // 判断当前this是否属于构造函数Parent的一个实例
    _classCallCheck(this, Parent)

    this.name = options.name || ''
    this.age = options.age || 20
  }

  _createClass(
    Parent,
    [
      {
        key: 'find',
        value: function (v) {
          return ''.concat(v, '慢慢慢慢慢慢')
        },
      },
      {
        key: 'info',
        get: function () {
          return 'name is '.concat(this.name).concat('，age is ', this.age)
        },
      },
    ],
    [
      {
        key: 'eat',
        value: function () {
          return ''.concat(this.name, ' eat apple')
        },
      },
    ]
  )

  return Parent
})()

const Child = function(Parent) {
  _inherits(Child, Parent) // 继承父类方法

  function Child(options) {
    _classCallCheck(this, Child)
    const val = Parent.call(this, options)
    // 如果父级返回了一个对象类型，则把this指向为这个返回的对象
    if(typeof val === 'object') return val
    return this
  }
  return Child
}(Parent)

const parent = new Parent({ name: '流了颗星' })

console.log(parent)
console.log(parent.find('666')) // 666慢慢慢慢慢慢
console.log(parent.info) // name is 流了颗星，age is 20
console.log(Parent.eat()) // Parent eat apple

const c = new Child({ name: '六六六' })
console.log('c----', c.info) // name is 六六六，age is 20

export default 'dsds'

// function red() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log('红灯亮~~~')
//       resolve(yellow)
//     }, 3000)
//   })
// }

// function yellow() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log('黄灯亮~~~')
//       resolve(green)
//     }, 1000)
//   })
// }

// function green() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log('黄灯亮~~~')
//       resolve(red)
//     }, 1000)
//   })
// }

Promise.resolve(1).then(v => {
  console.log('v- ----', v)
  return 4
}).then(q => {
  console.log('q2------', q)
})

Promise.resolve(1).then(v => {
  console.log('v- ----', v)
  throw v
}).then(q => {
  console.log('q2------', q)
}, e => {
  console.log('e----', e)
})

function Msg() {
  this.v = 'ddd'
}

var msg = new Msg()

console.log('d-----', msg instanceof Msg)

fn1()

console.log(1)

function fn1() {
  console.log(2)
  setTimeout(() => {
    console.log(3)
  }, 0)
}

new Promise((resolve) => {
  console.log(4)
  setTimeout(() => {
    console.log(5)
    resolve()
  }, 100)
}).then(() => {
  setTimeout(() => {
    console.log(10)
  }, 10)
  console.log(6)
})

Promise.resolve().then(() => {
  console.log(7)
  setTimeout(() => {
    console.log(8)
  })
})

setTimeout(() => {
  console.log(9)
}, 2)