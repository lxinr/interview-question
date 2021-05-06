> 千位分隔符格式的规则是数字的整数部分每三位一组，以','分节。小数部分不分节

```js
thousandSep(123456789) // 123,456,789
thousandSep(1234567.12) // 1,234,567.12
```

#### 1. 转成数组，往数组中插入分隔符

```js
function thousandSep(num, sep = 3, unit = ',') {
  if(isNaN(Number(num))) return num
  let arr = `${Number(num)}`.split('')
  let index = arr.length - 1 // 遍历起始点指针，从后往前

  // 遍历字符串，从后开始遍历
  // 开始
  let dotIdx = arr.indexOf('.')
  while(index >= 0) {
    // 存在小数点时的判断
    if(dotIdx !== -1) {
      const idx = (dotIdx - 1) - sep // 当存在小数点时，此时指针起始点应该是小数点位前一位，因此减1
      if(idx >= 0) {
        arr.splice(idx + 1, 0, unit) // 在起始下标后一位插入unit
        index = idx // 指针指向下一个起始下标
        dotIdx = -1 // 将其置为-1，表示小数点判断只执行一次
      } else {
        break;
      }
    } else {
      const idx = index - sep // 往前移动sep个单位，作为下一端的起始下标
      if(idx >= 0) {
        arr.splice(idx + 1, 0, unit) // 在起始下标后一位插入unit
        index = idx // 指针指向下一个起始下标
      } else {
        break;
      }
    }
  }

  return arr.join('')
}

console.log('thousandSep----', 
  thousandSep(123456789) === '123,456,789',
  thousandSep(12345678) === '12,345,678',
  thousandSep(1234567) === '1,234,567',
  thousandSep(1234) === '1,234',
  thousandSep(1234567.12) === '1,234,567.12',
  thousandSep(123456789.6789) === '123,456,789.6789'
)
```

#### 2. [toLocaleString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)

> toLocaleString() 方法返回这个数字在特定语言环境下的表示字符串

```js
numObj.toLocaleString([locales [, options]])
```

#### 3. 正则replace

```js
function thousandSep(num){
  return num.toString().replace(/\d+/, n => { // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, $1 => `${$1},`)
  })
}

console.log('thousandSep----', 
  thousandSep(123456789) === '123,456,789',
  thousandSep(12345678) === '12,345,678',
  thousandSep(1234567) === '1,234,567',
  thousandSep(1234) === '1,234',
  thousandSep(1234567.12) === '1,234,567.12',
  thousandSep(123456789.6789) === '123,456,789.6789'
)
```