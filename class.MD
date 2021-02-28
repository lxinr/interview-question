### class(类)的实现

#### 类的特性

##### 只能作为构造函数使用，作为普通函数时会报错

```js

 // class Msg {}

function _classCallCheck(instance, Constructor) {
  // 检测instance 是否是 Constructor 的一个实例
  if(!(instance instanceof Constructor)) {
    // 如果不是，则抛出一个类型错误
    throw new TypeError('不能直接作为函数调用')
  }
}

function _defineProperties(target, props) {
  for(var i = 0; i < props.length; i++) {
    var prop = props[i]
    // 如果存在value，即表示为可写入的
    if('value' in prop) prop.writable = true
    Object.defineProperty(taget, prop.key, prop)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  // 
  if(protoProps) {
    _defineProperties()
  }
}

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Msg = function () {
  'use strict'; // 类声明和类表达式的主体都执行在严格模式下
  // 判断当前this是否属于构造函数Msg的一个实例
  _classCallCheck(this, Msg)
}

console.log('msg---', Msg()) // Uncaught TypeError: 不能直接作为函数调用
console.log('msg---', new Msg()) // msg--- Msg {}
```

#### 父类实现

```js
function _classCallCheck(instance, Constructor) {
  // 检测instance 是否是 Constructor 的一个实例
  if(!(instance instanceof Constructor)) {
    // 如果不是，则抛出一个类型错误
    throw new TypeError('不能直接作为函数调用')
  }
}

function _defineProperties(target, props) {
  for(var i = 0; i < props.length; i++) {
    var prop = props[i]
    // 如果存在value，即表示为可写入的
    if('value' in prop) prop.writable = true
    // configurable
    Object.defineProperty(target, prop.key, prop)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  // 如果是原型方法，其应该是挂载在原型上
  if(protoProps) _defineProperties(Constructor.prototype, protoProps)
  // 如果是静态方法，则是直接挂载在构造函数上，静态方法不需要实例化该函数即可使用
  if(staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

var Msg = function () {
  'use strict'; // 类声明和类表达式的主体都执行在严格模式下'
  function Msg(options) {
    // 判断当前this是否属于构造函数Msg的一个实例
    _classCallCheck(this, Msg)

    this.name = options.name || ''
    this.age = options.age || 20
  }

  _createClass(Msg, [
    {
      key: 'find',
      value: function(v) {
        return ''.concat(v, '慢慢慢慢慢慢')
      }
    },
    {
      key: 'info',
      get: function() {
        return 'name is '.concat(this.name).concat('，age is ', this.age)
      }
    }
  ], [
    {
      key: 'eat',
      value: function() {
        return ''.concat(this.name, ' eat apple')
      }
    }
  ])

  return Msg
}()

const msg = new Msg({})
console.log(msg.find('666')) // 666慢慢慢慢慢慢
console.log(msg.info) // name is 流了颗星，age is 20
console.log(Msg.eat()) // Msg eat apple
```