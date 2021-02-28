export * from './c.js'

const result = [
  { id: 8117670, value: '我测再试一试' },
  { id: 6453543, value: '我再试一试测' },
  { id: 5031809, value: '测试啊啊啊' },
  { id: 5520659, value: '精锐教育不知道' },
  { id: 1052, value: '胡桃里垫底' },
  { id: 5031955, value: '测试1' },
  { id: 5031791, value: '测试测试11' },
  { id: 6415349, value: '这里来的野孩子' },
  { id: 5032003, value: '香飘飘奶茶，每年卖出七亿多杯' },
  { id: 8117484, value: '你是一条小蝌蚪' },
  { id: 5031997, value: '我的老天 啊22' },
  { id: 6438438, value: '南桃里路呀呀呀' },
  { id: 6382829, value: '东北南路哈哈哈' }
]

function fuzzySearch (val) {
  const reg = new RegExp(['', ...val, ''].join('.*'))
  console.log('reg----', reg)
  return result.filter((item) => reg.test(item.value))
}

function fuzzySearch2 (val = '') {

  function isMatch(value, match) {
    let matchs = [...match]
    let vals = [...value]
    while(matchs.length) {
      const idx = vals.indexOf(matchs.shift())
      if(idx === -1) return false

      vals.splice(0, idx + 1)
    }
    return true
  }

  return result.filter((item) => isMatch(item.value, val))
}

console.log('f-----', fuzzySearch('测试'), fuzzySearch('测绘'), fuzzySearch(''))

console.log('f---____--', fuzzySearch2('测试'), fuzzySearch2('测绘'), fuzzySearch2(''))


function Sl(nums1, nums2) {
  var map1 = {}
  var map2 = {}
  var nums3 = nums1.concat(nums2)

  for(let i = 0; i < nums3.length; i++) {
    if(!map1[nums3[i]]) {
      map1[nums3[i]] = 1
    } else {
      map2[nums3[i]] = 1
    }
  }
  return Object.keys(map2)
}

console.log(Sl)