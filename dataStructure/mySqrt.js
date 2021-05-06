// function mySqrt(x) {
//   if(x === 0 || x === 1) return x

//   let left = 1
//   let right = Math.floor(x / 2)

//   while(left < right) {
//     // 获取中位数，此时向上取整
//     let m = Math.ceil(left + (right - left) / 2)
//     // 如果使用乘法即m * m > x来判断就有可能出现溢出的情况，因此改用除法
//     // 如果区间中位数的平方大于x，则表明结果应该是在m的左侧区间
//     // 如果相等，则返回中位数
//     if(m === x / m) return m
//     if(m > x / m) {
//       right = m - 1
//     } else {
//       // 小于的话则表明在右侧区间
//       left = m
//     }
//   }
//   return left
// }

function mySqrt(x) {
  if(x === 0 || x === 1) return x
  let c = x
  // 迭代实现
  return Math.floor(sqrt(x))

  function sqrt(x) {
    // 这里就是刚才公式的具体体现即 x1 = x - f(x) / f'(x)
    // 为了不至于因为x*x导致栈溢出，直接简化
    // let x1 = x - (x * x - c) / (2 * x)
    let x1 = x - (x / 2 - c / (2 * x))
    // 判断如果两者间隔小于一个极小值10^-7，则可以认为是当前结果
    if(Math.abs(x - x1) < Math.pow(10, -7)) {
      return x1
    }
    return sqrt(x1)
  }
}

// 取幂
// function mySqrt(x) {
//   if(x === 0 || x === 1) return x
//   return Math.floor(Math.pow(x, 0.5))
// }
// // 直接平方
// function mySqrt(x) {
//   if(x === 0 || x === 1) return x
//   return Math.floor(Math.sqrt(x))
// }

function testQ(x) {
  let l = mySqrt(x)
  console.log('l----', l)
  return l === Math.floor(Math.sqrt(x))
}

for(let i = 2; i < 100; i++) {
  console.log('mySqrt---' + i, testQ(i))
}

// console.log('mySqrt--8---', testQ(8))
// console.log('mySqrt--9---', testQ(9))
// console.log('mySqrt--10---', testQ(10))
// console.log('mySqrt--11---', testQ(11))
// console.log('mySqrt--12---', testQ(12))
// console.log('mySqrt--13---', testQ(13))