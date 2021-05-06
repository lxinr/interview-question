var isPalindrome = function(x) {
  if (x < 0) return false
  if (x < 10) return true
  var s = '' + x
  var i = 0
  var j = s.length - 1
  while (i <= j) {
    if (s[i] !== s[j]) return false
    i++
    j--
  }
  return true
};

/**
 * 1. %10获取到最后一位
 * 2. 
 */
var isPalindrome = function(x) {
  // x小于0或x的最后一位是0则必然不是回文数
  if (x < 0 || Math.floor(x % 10) === 0) return false
  if (x < 10) return true
  var rn = 0
  // 只需要转一半即可进行判断
  // 如果x是偶数，则只需确认x === rn
  // 如果x是奇数，则中间那一位不需要判断，只需判断x === Math.floor(rn / 10)，即退一位的数据
  while(x > rn) {
    // rn * 10 -> 进一位，如1234，第一次得到 0 * 10 + 4 = 4，第二次得到 4 * 10 + 3 = 43 ... 最终得到4321
    rn = Math.floor(rn * 10 + x % 10)
    // 退一位 如1234，第一次得到123，第二次得到12，最终到0
    x = Math.floor(x / 10)
  }
  return x === rn || x === Math.floor(rn / 10)
};

console.log('reverseNum(1234)----', isPalindrome2(1001), isPalindrome2(12521), isPalindrome2(125210))