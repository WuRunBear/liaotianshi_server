/**
 * @description 数据格式化
 */
const {
  urlStaticResource
} = require('../conf/url')

/**
 * 用户默认头像
 * @param {Object} obj 用户对象
 */
function _formatUserAvatar(obj) {
  if (!obj.avatar) {
    obj.avatar = `${urlStaticResource}images/avatar.png`
  }else{
    obj.avatar = `${urlStaticResource}${obj.avatar}`
  }
  console.log(urlStaticResource );
  
  return obj
}

/**
 * 格式化用户对象
 * @param {Array|Object} list 用户列表后用户对象
 */
function formatUser(list) {
  if (list instanceof Array) {
    return list.map(_formatUserAvatar)
  }

  if (list instanceof Object) {
    return _formatUserAvatar(list)
  }

  return list
}

module.exports = {
  formatUser
}