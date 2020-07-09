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
  } else {
    obj.avatar = `${urlStaticResource}${obj.avatar}`
  }
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

/**
 * 初始化群成员
 * @param {Object} Obj 群对象
 */
function _formatChatRoomMember(Obj) {
  try {
    Obj.member = JSON.parse(Obj.member)
  } catch (error) {

  }
  return Obj
}

/**
 * 初始化群对象
 * @param {Array|Object} list 群列表或对象
 */
function formatChatRoom(list) {
  if (list instanceof Array) {
    return list.map(_formatChatRoomMember)
  }

  if (list instanceof Object) {
    return _formatChatRoomMember(list)
  }

  return list
}

module.exports = {
  formatUser,
  formatChatRoom
}