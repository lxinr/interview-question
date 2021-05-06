function isPrime(num) {
  var sq = Math.floor(num / 2)
  var index = 2
  while (index <= sq) {
    if (num % index === 0) return true
    index++
  }
  return false
}


for(let i = 2; i < 100; i++) {
  if(isPrime(i)) {
    console.log(i)
  }
}