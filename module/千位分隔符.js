function thousandSep(num) {
  if(isNaN(Number(num))) return num
  let arr = `${Number(num)}`.split('')
  let index = arr.length - 1

  // 遍历字符串，从后开始遍历
  // 开始
  let dotIdx = arr.indexOf('.')
  while(index >= 0) {
    if(dotIdx !== -1) {
      if((dotIdx - 3) > 0) {
        arr.splice(dotIdx - 3, 0, ',')
        index = dotIdx - 4
        dotIdx === -1
      } else {
        dotIdx === -1
        index = -1
      }
    } else {
      console.log('index----', index, arr)
      break;
      // if(index - 3 > 0) {
      //   arr.splice(index - 3, 0, ',')
      //   index = index - 4
      // } else {
      //   index = -1
      // }
    }

    console.log('index----', index, arr)
  }

  return arr.join('')
}

console.log('thousandSep----', thousandSep(1234.56))