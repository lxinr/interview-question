/**
 * bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，
 * 之后的一序列参数将会在传递的实参前传入作为它的参数
 * 
 * 1. 返回一个函数
 * 2. 可以传入参数
 * 3. 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数
 * 4. bind 方法所返回的函数并不包含 prototype 属性，并且将这些绑定的函数用作构造函数所创建的对象从原始的未绑定的构造函数中继承 prototype
 * 
 * from: https://github.com/mqyqingfeng/Blog/issues/12
 */

// 返回一个函数
// Function.prototype.myBind = function(context) {
//   var self = this
//   return function() {
//     return self.apply(context)
//   }
// }

Function.prototype.myBind = function(context) {

  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }

  var self = this
  var args = Array.prototype.slice.call(arguments, 1) // 从第二个参数起作为入参
  // 通过一个空函数来进行中转
  var fNOP = function() {}
  var fBound = function() {
    var arrs = Array.prototype.slice.call(arguments) // 如果还有传参，则也加入入参
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(this instanceof fNOP ? this : context, args.concat(arrs))
  }
  // 下述代码其实就类似于fBound.prototype = Object.create(this.prototype)
  // 为了让 fBound 构造的实例能够继承绑定函数的原型中的值，这是原生bind所具有的能力
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()

  return fBound
}

var foo = {
  value: 1
};

function bar() {
  console.log(this.value);
}

function bar2() {
  // console.log(this.value);
  return 'bar2---' + this.value
}

var barFoo = bar.bind(foo)
var barFoo2 = bar2.bind(foo)

barFoo()

console.log(barFoo2())

var myBarFoo = bar.myBind(foo, 'vvv')
var myBarFoo2 = bar2.myBind(foo)

myBarFoo('zzz')
console.log(myBarFoo2())