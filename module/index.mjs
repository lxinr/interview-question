import GeneratorFunc from './generator.mjs'
GeneratorFunc()

const sourceInfo = {
  v: 3,
  value: {
    key: '222'
  },
  arr: [4, 6, 9]
}

const copy = {...sourceInfo}

sourceInfo.v = 6
sourceInfo.value.key = 999

console.log(sourceInfo.v === copy.v)
console.log(sourceInfo.value.key === copy.value.key)

const sv = [1, 6, 40, {
  b: 45
}]

const cv = sv.concat()

sv[1] = 9
sv[3].b = '666'

console.log(sv[1] === cv[1]) // false
console.log(sv[3].b === cv[3].b) // true

const testInfo = {
  f: 3,
  msg: function () {
    return '哈哈哈哈'
  },
  v: '34523423',
  set: new Set(),
  res: {
    data: 4567
  }
}

const ct = JSON.parse(JSON.stringify(testInfo))
testInfo.f = 8
testInfo.res.data = 8888


console.log(testInfo.f === ct.f) // false
console.log(testInfo.res.data === ct.res.data) // false