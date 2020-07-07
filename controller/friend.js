const {
  getFriend,
  getFriends,
  createFriend,
  updateFriend
} = require('../services/friend')
const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')
const {
  isFriendFailInfo,
  addFriendFailInfo,
  addFriendFailIsFriendInfo,
  changeFriendFailInfo,
  getFriendListFailInfo
} = require('../model/ErrorInfo')

/**
 * 验证是否为好友 如果是返回数据 
 * @param {Object} ctx koa ctx
 * @param {Number} friendId 好友ID
 */
async function isFriend(ctx, {
  friendId
}) {
  let res = await getFriend({
    userId: ctx.session.userInfo.id,
    friendId
  })

  let res2 = await getFriend({
    userId: friendId,
    friendId: ctx.session.userInfo.id
  })

  if (res && res2) {
    return new SuccessModel()
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

  let isfriend = await isFriend(ctx, {
    friendId
  })

  if (isfriend.errno === 0) {
    return new ErrorModel(addFriendFailIsFriendInfo)
  }

  let res = await createFriend({
    userId: ctx.session.userInfo.id,
    friendId,
    alias,
    blackList
  })

  if (res) {
    return new SuccessModel()
  }
  return new ErrorModel(addFriendFailInfo)
}

/**
 * 获取当前账号好友列表
 * @param {Object} ctx koa ctx
 */
async function getFriendList(ctx) {
  let res = await getFriends({
    userId: ctx.session.userInfo.id,
  })

  if (res) {
    return new SuccessModel(res)
  }

  return new ErrorModel(getFriendListFailInfo)
}

/**
 * 修改信息
 * @param {Object} ctx koa ctx
 * @param {Number} friendId 好友ID
 */
async function changeFriendInfo(ctx, {
  friendId,
  alias,
  blackList = false
}) {
  let res = await updateFriend({
    userId: ctx.session.userInfo.id,
    friendId,
    alias,
    blackList
  })

  if (res) {
    return new SuccessModel()
  }
  return new ErrorModel(changeFriendFailInfo)
}

module.exports = {
  isFriend,
  addFriend,
  getFriendList,
  changeFriendInfo
}