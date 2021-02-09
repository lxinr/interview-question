export default class HashRouter {
  constructor() {
    // 使用一个map来保存路由信息
    this.routers = new Map()
    this._listener()
  }
  // 监听路由变动
  _listener() {
    const _handler = this.handler.bind(this)
    window.addEventListener('hashchange',_handler,false)
    // 模拟注册完成之后执行一次，用于index
    setTimeout(() => {
      _handler()
    }, 0)
  }
  // 注册路由
  register(hash = '', callback) {
    this.routers.set(hash, callback)
  }
  // 注册路由首页
  registerIndex(callback) {
    this.routers.set('index', callback)
  }
  // 注册404页
  registerNotFound(callback) {
    this.routers.set('404', callback)
  }
  // 用于执行回调函数
  handler() {
    const hash = location.hash.slice(1)
    let cb
    if(hash) {
      if(!this.routers.has(hash)) {
        cb = this.routers.get('404')
      } else {
        cb = this.routers.get(hash)
      }
    } else {
      cb = this.routers.get('index')
    }

    cb.call(this)
  }

}