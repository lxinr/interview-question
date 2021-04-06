> 在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术

#### 实现
```js
function curry(fn, args = []) {
  // 函数的形参个数
  let len = fn.length
  return (..._args) => {
    _args = [...args, ..._args]
    // 当得到的形参个数与原函数一致时，执行fn
    if(_args.length === len) {
      return fn(..._args)
    } else {
      // 否则再继续执行curry
      return curry(fn, _args)
    }
  }
}
// 优化写法
const curry2 = (fn, ...args) => args.length >= fn.length ? fn(...args) : curry2.bind(null, fn, ...args)
```

**⚠️ 当形参中存在默认参数时，获取的的length是不准确的**

```js
function test(a, b, c = 2) {
  return a + b + c
}

test.length // 2
```

#### 衍生 - 不定长调用

```js
// 实现如下所示add方法
add(1); // 1
add(1)(2); // 3
add(1)(2)(3); // 6

function add(...args1) {
  const argsSum1 = args1.reduce((a, c) => a + c)
  let fn = (...args2) => add(argsSum1 + args2.reduce((a, c) => a + c))
  // 重写fn的valueOf，原因是因为在执行+add()时，会执行add.valueOf()方法
  // https://www.cnblogs.com/polk6/p/js-adv-addopr.html
  fn.valueOf = () => argsSum1
  return fn
}

+add(1) // 1
+add(1, 2) // 2
+add(1)(2)(3) // 6
```