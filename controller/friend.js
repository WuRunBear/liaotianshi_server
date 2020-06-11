const {
  getFriends,
  createFriend
} = require('../services/friend')
const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')
const {
  isFriendFailInfo
} = require('../model/ErrorInfo')

/**
 * 验证是否为好友 如果是返回数据 
 * @param {Object} ctx koa ctx
 * @param {Number} friendId 好友ID
 */
async function isFriend(ctx, {
  friendId
}) {
  let res = await getFriends({
    userId: ctx.session.userInfo.id,
    friendId
  })
  
  if (res) {
    return new SuccessModel(res)
  }

  return new ErrorModel(isFriendFailInfo)
}

/**
 * 添加好友
 * @param {Object} ctx koa ctx
 * @param {Number} friendId 好友id
 * @param {String} alias 备注  可选
 * @param {Boolean} blackList 黑名单  可选  默认为false
 */
async function addFriend(ctx, {
  friendId,
  alias,
  blackList = false
}) {
  let res = await createFriend({
    userId: ctx.session.userInfo.id,
    friendId,
    alias,
    blackList
  })

  if (res) {
    return new SuccessModel(res)
  }
  return
}
module.exports = {
  isFriend,
  addFriend
}