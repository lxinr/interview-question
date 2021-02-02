/*
 * Description: 节流和防抖
 * Project Name: src
 * File Path: /节流和防抖.js
 * File Created Date: 2021-02-02 16:04
 * Author: liux
 * -----
 * Last Modified: 2021-02-02 16:04
 * Modified By: liux
 * -----
 * HISTORY:
 */

// 在一个单位时间内，无论触发多少次方法，最多只有一次生效

function throttle(fn, interval = 300) {
  let startdate = 0

  return function (...args) {
    const nowdate = +new Date()
    if(nowdate - startdate >= interval) {
      fn.apply(this, args)
      startdate = nowdate
    }
  }
}

// 在事件被触发一定时间后再执行回调，如果在这一定时间内又被触发，则重新计时
/**
 * 函数防抖
 *
 * @author liux
 * @date 2021-02-02
 * @param {function} fn
 * @param {number} [wait=300]
 * @param {*} immediate
 */

/**
 * 函数防抖
 *
 * @author liux
 * @date 2021-02-02
 * @param {function} fn
 * @param {number} [wait=300]
 * @param {boolean} [immediate=false]
 * @returns {function}
 */
function debounce (fn, wait = 300, immediate = false) {
  let timer
  return function (...args) {
    if (timer) clearTimeout(timer)

    if (immediate) {
      const imTimer = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (imTimer) fn.apply(this, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    }
  }
}
// function debounce(fn, wait = 300, immediate) {
//   let timer = 0
//   return function(...args) {
//     const nowdate = +new Date()
//     if(immediate) {
//       !timer && fn.apply(this, args)
//     } else {
//       if(nowdate - timer >= wait) {
//         timer && fn.apply(this, args)
//       }
//     }
//     timer = nowdate
//   }
// }
