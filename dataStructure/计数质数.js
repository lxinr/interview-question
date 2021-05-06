// 统计所有小于非负整数 n 的质数的数量
function countPrimes(n) {
  if(n <= 2) return 0 
  if( n === 3) return 1

  let num = 0
  // 判断是否为质数
  function isPrime(x) {
    if(x <= 3) return true
    const sqrt = Math.ceil(Math.sqrt(x))
    // 因为我们已经排除了所有的偶数，所以可以直接+2，跳过偶数，来减少循环次数
    for(let i = 3; i <= sqrt; i+=2) {
      // 如果能被整除则代表不是质数
      if ((x / i) % Math.floor(x / i) === 0) return false
    }
    return true
  }

  for(let i = 2; i < n; i++) {
    // 任何一个除2以外的偶数都至少有2这个约数，因此不需要去判断
    if (i > 2 && i % 2 === 0) continue
    if(isPrime(i)) num++
  }

  return num
}

function countPrimes2(n) {
  let count = 0
  const numArr = Array(n).fill(0)
  for(let i = 2; i < n; i++) {
    if(!numArr[i - 1]) {
      count++
      for(let j = i * i; j < n; j += i) {
        numArr[j - 1] = true
      }
    }
  }
  return count
}

function countPrimes3(n) {
  if(n <= 2) return 0 
  if( n === 3) return 1

  let num = 0

  // 生成[minN, maxN]内的随机整数
  function randomNum(minN, maxN) {
    return Math.floor(Math.random() * (maxN - minN + 1) + minN)
  }

  // 得到两个数的最大公约数
  function gcd(a, b) {
    if(b === 0) return a
    return gcd(b, a%b)
  }
  
  function isPrime(x, k = 5) {

    for(let i = 0; i < k; i++) {
      const v = randomNum(2, x - 2)
      if(gcd(v, x) !== 1) return false
      // 这里因为数太大，结果会不精确，因此在这里最后应该进行专门的大数比较
      if(Math.pow(v, x - 1) % x !== 1) return false
    }
    return true
  }

  for(let i = 2; i < n; i++) {
    // 任何一个除2以外的偶数都至少有2这个约数，因此不需要去判断
    if (i > 2 && i % 2 === 0) continue
    if(isPrime(i)) num++
  }

  return num

}

console.log('10----', countPrimes(10))
