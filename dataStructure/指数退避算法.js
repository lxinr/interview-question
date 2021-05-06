
function entry(count = 1, errorRetryInterval = 3000) {
  count = Math.min(count, 8)
  const timeout = ~~((Math.random() + 0.5) * (1 << count)) * errorRetryInterval

  if (!count) return

  console.log('t------', count, timeout)

  setTimeout(() => {
    entry(count--, errorRetryInterval)
  }, timeout)
}

var count = 3

// entry(count)

function test222(count = 3) {
  if(!count) return
  console.log('count----', count)
  setTimeout(() => {
    test222(count--)
  }, 1000)
}

test222(4)