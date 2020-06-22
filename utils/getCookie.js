/**
 * 将字符串的cookie解析为对象
 * @param {String} cookie cookie
 * @return cookie对象
 */
module.exports = function getCookie(cookie) {
  let obj = {}
  cookie.split(';').map(item => {
    let v = item.trim().split('=')
    obj[v[0]] = v[1]
  })

  return obj
}