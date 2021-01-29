function createNew () {
  // 获取构造函数及参数
  const [Con, ...args] = [...arguments]
  // 创建一个空的对象
  const obj = new Object()
  obj.__proto__ = Con.prototype // 将对象链接到构造函数的原型上,这样 obj 就可以访问到构造函数原型中的属性
  // 或者直接使用
  const obj = Object.create(Con.prototype)
  
  const ret = Con.apply(obj, args) // 改变构造函数的this指向到obj，这样 obj 就可以访问到构造函数中的属性
  // 需判断构造函数是否存在返回值，如果返回值是个对象(非null)，则返回该对象，否则返回obj
  return ret instanceof Object ? ret : obj // 或者 typeof ret === 'object' ? ret || obj : obj
}

// 使用
function Person (info) {
  console.log('person---', info) 
}

createNew(Person, { v: 20 })