// class _LazyMan {
//   constructor(val) {
//     this.queues = [] // 执行队列
    
//     const queue = () => {
//       console.log('Hi! This is ' + val)
//       this.next()
//     }
//     this.queues.push(queue)
//     setTimeout(() => { // 在下一个事件循环开始执行方法
//       this.next()
//     }, 0)
//     return this
//   }
//   next() {
//     const queue = this.queues.shift() // 先进先出
//     queue && queue()
//   }
//   sleep(timer) {
//     const queue = () => {
//       setTimeout(() => {
//         console.log(`Wake up after ${timer}`)
//         this.next()
//       }, timer * 1000)
//     }
//     this.queues.push(queue)
//     return this
//   }
//   sleepFirst(timer) {
//     const queue = () => {
//       setTimeout(() => {
//         console.log(`Wake up after ${timer}`)
//         this.next()
//       }, timer * 1000)
//     }
//     this.queues.unshift(queue)
//     return this
//   }
//   eat(val) {
//     const queue = () => {
//       console.log(`Eat ${val}`)
//       this.next()
//     }
//     this.queues.push(queue)
//     return this
//   }
// }

// function LazyMan(val) {
//   return new _LazyMan(val)
// }

// function _LazyMan(val) {
//   this.queues = []
//   const queue = () => {
//     console.log('这是 ' + val)
//     this.next()
//   }
//   this.queues.push(queue)

//   setTimeout(() => {
//     this.next()
//   })

//   return this
// }

// _LazyMan.prototype.next = function () {
//   const queue = this.queues.shift()
//   queue && queue()
// }

// _LazyMan.prototype.eat = function (val) {
//   const queue = () => {
//     console.log('想吃 ' + val)
//     this.next()
//   }
//   this.queues.push(queue)
//   return this
// }

// _LazyMan.prototype.sleep = function (timer) {
//   const queue = () => {
//     console.log(`Wake up before ${timer}`)
//     setTimeout(() => {
//       console.log(`Wake up after ${timer}`)
//       this.next()
//     }, timer * 1000)
//   }

//   this.queues.push(queue)

//   return this
// }

// _LazyMan.prototype.sleepFirst = function (timer) {
//   const queue = () => {
//     console.log(`Wake up before ${timer}`)
//     setTimeout(() => {
//       console.log(`Wake up after ${timer}`)
//       this.next()
//     }, timer * 1000)
//   }

//   this.queues.unshift(queue)

//   return this
// }

export default function LazyMan(val) {
  var queues = []

  function next() {
    var queue = queues.shift()
    queue && queue()

    if (!queues.length) queues = null
  }

  const protos = {
    init() {
      var queue = function() {
        console.log('Hi! This is ' + val)
        next()
      }
      queues.push(queue)
      setTimeout(next, 0)
    },
    sleep(timer) {
      var queue = function() {
        setTimeout(function() {
          console.log('Wake up after ' + timer)
          next()
        }, timer * 1000)
      }
      queues.push(queue)

      return this
    },
    eat(info) {
      var queue = function() {
        console.log('Eat ' + info + '~')
        next()
      }
      queues.push(queue)
      return this
    },
    sleepFirst(timer) {
      var queue = function() {
        setTimeout(function() {
          console.log('Wake up after ' + timer)
          next()
        }, timer * 1000)
      }
      queues.unshift(queue)
      return this
    }
  }

  protos.init()

  return protos
}


// export default function(val) {
//   return new _LazyMan(val)
// }


// LazyMan('流了颗星').eat('哈密瓜').sleepFirst(6).eat('西红柿').sleep(3).eat('葡萄')
