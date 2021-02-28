/*
 * Description: 深浅拷贝
 * Project Name: module
 * File Path: /cloneDeep.mjs
 * File Created Date: 2021-02-20 15:01
 * Author: liux
 * -----
 * Last Modified: 2021-02-20 15:01
 * Modified By: liux
 * -----
 * 
 * 1. 如果是原始类型，无需继续拷贝，直接返回
 * 2. 如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上
 * 3. 针对一些特定的类型特殊处理，如Set,Map
 * 4. 简单处理：除Array,Object,Map,Set外，其余类型都直接返回
 * 
 * 优化点
 * 1. 使用WeakMap来解决循环引用导致的问题
 * 2. 使用循环的方式来解决迭代所可能导致的爆栈问题
 * 
 * 深入 js 深拷贝对象 - https://www.jianshu.com/p/b08bc61714c7
 * 深拷贝的终极探索（90%的人都不知道） - https://juejin.cn/post/6844903692756336653
 * 如何写出一个惊艳面试官的深拷贝? - https://segmentfault.com/a/1190000020255831
 */


const arrayTag = '[object Array]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const objectTag = '[object Object]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const functionTag = '[object Function]'
const nullTag = '[object Null]'
const undefinedTag = '[object Undefined]'

// 需遍历拷贝的类型
const quoteTags = [arrayTag, objectTag, mapTag, setTag]

export function typeTag(target) {
  return Object.prototype.toString.call(target)
}

/**
 * 深拷贝方法
 *
 * @author liux
 * @date 2021-02-21
 * @export
 * @param {*} target
 * @param {*} [map=new WeakMap()]
 * @returns 
 */
export function cloneDeep(target, map = new WeakMap()) {
  // 因WeakMap的键为弱引用，可被垃圾回收，用于解决循环引用的问题
  let cloneTarget

  const targetType = typeTag(target)

  function initTarget(target, type) {
    const Ctor = target.constructor // 得到实例对象的引用
    // 使用Object.create(null)创建的的对象没有constructor
    if(!Ctor && type === objectTag) return new Object
    return new Ctor()
  }


  // 是否是需迭代处理的类型
  function isQuote(obj) {
    return quoteTags.indexOf(typeTag(obj)) !== -1
  }

  function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index)
    }
    return array
  }
  // 如果不是需遍历的类型，则直接返回
  if(!isQuote(target)) {
    return target
  } else {
    cloneTarget = initTarget(target, targetType)
    if(map.has(target)) return map.get(target)

    map.set(target, cloneTarget)
    // 处理数组和对象
    if(targetType === objectTag || targetType === arrayTag) {
      for(let key in target) {
        cloneTarget[key] = cloneDeep(target[key], map)
      }

      // 或使用while来处理，能适当提高效率
      // const keys = isArray ? undefined : Object.keys(target)
      // forEach(keys || target, (value, key) => {
      //   if (keys) key = value
      //   cloneTarget[key] = cloneDeep(target[key], map)
      // })
    }

    // 处理Map
    if(targetType === mapTag) {
      target.forEach((subTarget, key) => {
        cloneTarget.set(key, cloneDeep(subTarget, map))
      })
    }
    // 处理Set
    if(targetType === setTag) {
      target.forEach(subTarget => {
        cloneTarget.add(cloneDeep(subTarget, map))
      })
    }
  }

  return cloneTarget

}

class Stack {
  constructor() {
    this.__data__ = []
  }
  has(target) {
    return this.__data__.indexOf(target) !== -1
  }
  get(target) {
    return this.__data__.find(v => v === target)
  }
  set(target) {
    if(!this.has(target)) {
      this.__data__.push(target)
    }
  }
  clear() {
    this.__data__ = []
  }
}


export function cloneDeep2(source) {

  const map = new Stack()
  
  function clone(target) {
    let cloneTarget

    const targetType = typeTag(target)

    function initTarget(target, type) {
      const Ctor = target.constructor // 得到实例对象的引用
      // 使用Object.create(null)创建的的对象没有constructor
      if(!Ctor && type === objectTag) return new Object
      return new Ctor()
    }


    // 是否是需迭代处理的类型
    function isQuote(obj) {
      return quoteTags.indexOf(typeTag(obj)) !== -1
    }

    // 如果不是需遍历的类型，则直接返回
    if(!isQuote(target)) {
      return target
    } else {
      cloneTarget = initTarget(target, targetType)
      if(map.has(cloneTarget)) return map.get(cloneTarget)

      map.set(cloneTarget)
      // 处理数组和对象
      if(targetType === objectTag || targetType === arrayTag) {
        for(let key in target) {
          cloneTarget[key] = clone(target[key])
        }
      }

      // 处理Map
      if(targetType === mapTag) {
        target.forEach((subTarget, key) => {
          cloneTarget.set(key, clone(subTarget))
        })
      }
      // 处理Set
      if(targetType === setTag) {
        target.forEach(subTarget => {
          cloneTarget.add(clone(subTarget))
        })
      }
    }

    return cloneTarget
  }

  const res = clone(source)

  map.clear()

  stacks = null

  return res
}


