function fib(n) {
  if(n < 0 || n > 100) throw new Error('超出范围')
  if (n < 2) return n
  return fib(n - 1) + fib(n - 2)
}

function fib2(n, r1, r2) {
  if(n < 0 || n > 100) throw new Error('超出范围')
  if(n === 0) return r1
  return fib2(n - 1, r2, r1 + r2)
}

console.log('fib)---', fib(5), fib2(50, 0, 1))