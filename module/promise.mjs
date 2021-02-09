class MyPromise {
  constructor(resolve, reject) {
    // return this
  }
  then(cb) {
    const res = { v: 3 }
    return this
  }
  catch() {
    return this._reject()
  }
  _resolve() {
    return this
  }
  _reject() {
    return this
  }
}

export default MyPromise