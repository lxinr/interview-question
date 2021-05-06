// new Promise((resolve) => {
//   console.log(4)
//   setTimeout(() => {
//     console.log(5)
//     resolve()
//   }, 100)
// }).then(() => {
//   setTimeout(() => {
//     console.log(10)
//   }, 10)
//   console.log(6)
// })

// Promise.resolve().then(() => {
//   console.log(7)
//   setTimeout(() => {
//     console.log(8)
//   })
// })

// setTimeout(() => {
//   console.log(9)
// }, 1)

// console.log('script start')

// async function async1() {
//   await async2()
//   console.log('async1 end')
// }
// async function async2() {
//   console.log('async2 end')
// }
// async1()

// setTimeout(function() {
//   console.log('setTimeout')
// }, 0)

// new Promise(resolve => {
//   console.log('Promise')
//   resolve()
// })
//   .then(function() {
//     console.log('promise1')
//   })
//   .then(function() {
//     console.log('promise2')
//   })

// console.log('script end')

// function curry(fn, ...args1) {
//   // Function.length -> 指明函数的形参个数
//   if(args1.length >= fn.length) {
//     return fn(...args1)
//   }

//   return function(...args2) {
//     return curry(fn, ...args1, ...args2)
//   }
// }

curry.playholder = Symbol()

const join = (a, b, c) => {
  return `${a}_${b}_${c}`
}

const curryJoin = curry(join)

console.log('d----', curryJoin(1)(2, 3))


