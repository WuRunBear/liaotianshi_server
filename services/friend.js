// 好友表模型
const {
  friend
} = require('../db/model/index')
// const {
// } = require('./_format')
const Op = require('sequelize').Op

/**
 * 获取用户好友
 * @param {Number} userId 用户id
 * @param {Number} friendId 好友id
 * @param {Number} limit 每页显示条数
 * @param {Number} offset 跳过几条数据
 */
async function getFriends({
  userId,
  friendId,
  offset = 0,
  limit = 10,
}) {
  let where = {
    userId
  }

  if (friendId) {
    Object.assign(where, {
      friendId
    })
  }

  let result = await friend.findAndCountAll({
    limit,
    offset,
    where
  })

  if (result.count > 0) {
    return result
  }

  return
}

/**
 * 添加好友
 * @param {Number} userId 用户id
 * @param {Number} friendId 好友id
 * @param {String} alias 备注  可选
 * @param {Boolean} blackList 黑名单  可选  默认为false
 */
async function createFriend({
  userId,
  friendId,
  alias,
  blackList = false
}) {

  let result = await friend.create({
    userId,
    friendId,
    alias,
    blackList
  })

  if (result) {
    return result
  }
  return
}

module.exports = {
  getFriends,
  createFriend
}