// 好友表模型
const {
  friend,
  user
} = require('../db/model/index')
// const {
// } = require('./_format')
const Op = require('sequelize').Op

/**
 * 获取用户单个好友
 * @param {Number} userId 用户id
 * @param {Number} friendId 好友id
 */
async function getFriend({
  userId,
  friendId,
}) {
  let where = {
    userId
  }

  if (friendId) {
    Object.assign(where, {
      friendId
    })
  }

  let result = await friend.findOne({
    attributes: ['id', 'userId', 'friendId', 'alias', 'blackList'],
    include: [{
      attributes: ['id', 'userName', 'nickName', 'avatar', 'gender', 'city'],
      model: user,
    }],
    where
  })

  if (result) {
    return result
  }

  return
}


/**
 * 获取用户所有好友
 * @param {Number} userId 用户id
 * @param {Number} limit 每页显示条数
 * @param {Number} offset 跳过几条数据
 */
async function getFriends({
  userId,
  offset = 0,
  limit = 10,
}) {
  let where = {
    userId
  }

  let result = await friend.findAndCountAll({
    limit,
    offset,
    include: [{
      attributes: ['id', 'userName', 'nickName', 'avatar',],
      model: user,
    }],
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
 * @returns {Object|null} 返回数据或空
 */
async function createFriend({
  userId,
  friendId,
  alias,
  blackList = false
}) {
  if (typeof friendId !== 'number') return

  let isFriend = await getFriend({
    userId,
    friendId
  })
  if (isFriend) return

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

/**
 * 修改信息
 * @param {Number} userId 用户id
 * @param {Number} friendId 好友id
 * @param {String} alias 备注  可选
 * @param {Boolean} blackList 黑名单  可选  默认为false
 * @returns {Boolean} 返回布尔型
 */
async function updateFriend({
  userId,
  friendId,
  alias,
  blackList = false
}) {

  if (typeof friendId !== 'number') return

  // 验证是否为好友
  let isFriend = await getFriend({
    userId,
    friendId
  })
  if (!isFriend) return

  // 要更新的数据和条件
  let updateData = {}, where = {
    userId,
    friendId
  }

  if (alias) updateData.alias = alias
  if (blackList) updateData.blackList = blackList

  let result = await friend.update(updateData, {
    where
  })

  if (result) {
    return true
  }
  return
}

module.exports = {
  getFriend,
  getFriends,
  createFriend,
  updateFriend
}