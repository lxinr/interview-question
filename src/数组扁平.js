/*
 * Description: 数组扁平
 * Project Name: src
 * File Path: /数组扁平.js
 * File Created Date: 2021-02-01 14:47
 * Author: liux
 * -----
 * Last Modified: 2021-02-01 14:47
 * Modified By: liux
 * -----
 * HISTORY:
 */

// 递归实现
function flatten1(array = []) {
  if(!array || !array.length) return array
  var result = []

  for(var i = 0, len = array.length; i < len; i++) {
    if(Array.isArray(array[i])) {
      result = result.concat(flatten1(array[i]))
    } else {
      result.push(array[i])
    }
  }

  return result
}

// toString
// 仅适用于都是string类型或都是number类型的去重
function flatten2(array = [], type = 'number') {
  if(!array || !array.length) return array
  return array.toString().split(',').map(v => type === 'number' ? +v : v)
}

// reduce
function flatten3(array = []) {
  if(!array || !array.length) return array
  const result = array.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flatten3(cur): cur)
  }, [])

  return result
}

// es2019 - flat
function flatten4(array = []) {
  if(!array || !array.length) return array
  return array.flat(Infinity)
}



var arr = [1, 2, 3, [4, 5, [6, 7, 8], [9]]]

console.log(flatten1(arr),flatten2(arr), flatten3(arr), flatten4(arr))