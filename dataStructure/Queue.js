/**
 * 栈
 * 
 * 遵循先进先出的有序集合
 * 
 * 方法
 * 
 * enqueue(ele) 添加一个或多个元素到队列尾部
 * dequeue() 移除队列中的第一个元素，同时返回被移除的元素
 * front() 返回队列中的第一个元素元素，不对队列做任何修改
 * isEmpty() 判断队列中是否有元素，有则返回true，否则返回false
 * clear() 移除队列中所有元素
 * size() 返回队列中元素个数
 */


const _Queue = (() => {
  // 实现私有属性
  const items = new WeakMap()

  class Queue {
    constructor () {
      items.set(this, [])
    }
    enqueue (...args) {
      const item = items.get(this)
      item.push(...args)
    }
    dequeue () {
      const item = items.get(this)
      return item.shift()
    }
    front () {
      const item = items.get(this)
      return item[0]
    }
    isEmpty () {
      return !this.size()
    }
    clear () {
      items.set(this, [])
    }
    size () {
      const item = items.get(this)
      return item.length
    }
  }
  return Queue
})()


export default _Queue