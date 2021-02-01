/*
 * Description: 数组去重
 * Project Name: src
 * File Path: /数组去重.js
 * File Created Date: 2021-01-30 17:04
 * Author: liux
 * -----
 * Last Modified: 2021-01-30 17:05
 * Modified By: liux
 * -----
 * HISTORY:
 */

//  双层遍历方法
function unique1(array = []) {
  if(!array || !array.length) return array

  var res = []

  for(var i = 0, len = array.length; i < len; i++) {
    var flag = true
    for(var j = 0; j < res.length; j++) {
      if(res[j] === array[i]) {
        flag = false
        break;
      }
      flag = true
    }

    if(flag) res.push(array[i])
  }
  return res
}

// 双层遍历优化版本
function unique2(array = []) {
  if(!array || !array.length) return array

  var res = []

  for(var i = 0, len = array.length; i < len; i++) {
    var j = 0, resLen = res.length
    for(var j = 0; j < resLen; j++) {
      if(res[j] === array[i]) {
        break;
      }
    }
    // // 如果array[i]是唯一的，那么执行完循环，j等于resLen
    if(j === resLen) res.push(array[i])
  }
  return res
}

// filter
function unique3(array = []) {
  if(!array || !array.length) return array
  return array.filter((v, i, arr) => {
    return arr.indexOf(v) === i // 如果不等，说明v在数组中并不是第一次出现，因此返回false
  })
}

// Set
function unique4(array = []) {
  if(!array || !array.length) return array
  return Array.from(new Set(array))
  // return [...new Set(array)]
}

// Map
function unique5(array = []) {
  if(!array || !array.length) return array
  const map = new Map()
  return array.filter(a => !map.has(a) && map.set(a, 1))
}

var arr = [1, 3, 4, 5, 5, null, undefined, undefined, 0, null, '1234', 9, Symbol(), function a() {}, function b() {}, { s: 1 }, { s: 2 }, { s: 1 }, [3]]

console.log(unique1(arr))
console.log(unique2(arr))
console.log(unique3(arr))
console.log(unique4(arr))