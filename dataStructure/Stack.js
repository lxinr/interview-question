/**
 * 栈
 * 
 * 遵循后进先出的有序集合
 * 
 * 方法
 * 
 * push(ele) 添加一个或多个元素到栈顶
 * pop() 移除栈顶元素，同时返回被移除的元素
 * peek() 返回栈顶元素，不对栈做任何修改
 * isEmpty() 判断栈内是否有元素，有则返回true，否则返回false
 * clear() 移除栈内所有元素
 * size() 返回栈内元素个数
 */

const _Stack = (() => {
  // 实现私有属性
  const items = new WeakMap()

  class Stack {
    constructor () {
      items.set(this, [])
    }
    push (...args) {
      const item = items.get(this)
      item.push(...args)
    }
    pop () {
      const item = items.get(this)
      return item.pop()
    }
    peek () {
      const item = items.get(this)
      return item[this.size() - 1]
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
  return Stack
})()

export default _Stack