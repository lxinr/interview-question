export function urlParse(url) {
  url = url || window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.slice(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      obj[key] = decodeURIComponent((tempArr[1]))
    })
  }

  return obj
}