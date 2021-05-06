#### 精度问题产生的原因

> JavaScript的数字存储使用了IEEE 754中规定的双精度浮点数数据类型，而这一数据类型能够安全存储 -(253 - 1) 到 253 - 1 之间的数值（包含边界值）

在`JavaScript`中，使用`Number.MAX_SAFE_INTEGER`来表示最大安全整数，具体值为`9007199254740991`

所以在表示一个超出安全数的数值时只能用字符串来表示，如`'1234567899999999999'`，如直接使用`1234567899999999999`，在浏览器中表现出来的可能是`1234567900000000000`

#### 两个大数相加
```js
class BigNumber {
  static add(s1, s2) {
    // 获取两个数字的最大长度，来对其数字
    const maxLen = Math.max(s1.length, s2.length)
    // 在左侧空位补充0
    // 如12322849, 68915 => 12322849 00068915
    s1 = s1.padStart(maxLen, 0)
    s2 = s2.padStart(maxLen, 0)

    // 进位
    let binary = 0
    let sum = ''
    for(let i = maxLen - 1; i >= 0; i--) {
      let t = parseInt(s1[i]) + parseInt(s2[i]) + binary
      binary = Math.floor(t/10)
      sum = `${t%10}${sum}`
      // 当第一位需要进位时，需在sum前加上进位
      if(!i && binary) sum = `${binary}${sum}`
    }
    return sum
  }
}
 
BigNumber.add('9007199254740991', '1234567899999999999') // 1243575099254740990
```

#### 多个大数相加
```js
class BigNumber {
  static plus(...args) {
    // 获取最大长度，来进行补零操作
    const maxLen = Math.max(...args.map(v => v.length))
    // 进位
    let binary = 0
    let sum = ''
    for(let i = maxLen - 1; i >= 0; i--) {
      // 补零操作
      // 累加
      let t = args.map(v => v.padStart(maxLen, 0)).reduce((acc, cur) => acc + parseInt(cur[i]), 0) + binary
      binary = Math.floor(t/10)
      sum = `${t%10}${sum}`
      // 当第一位需要进位时，需在sum前加上进位
      if(!i && binary) sum = `${binary}${sum}`
    }
    return sum
  }
}

BigNumber.plus('9007199254740991', '1234567899999999999') // 1243575099254740990
BigNumber.plus('9007199254740991', '1234567899999999999', '89768908333333333') // 1333344007588074323
```