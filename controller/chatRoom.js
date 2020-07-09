const {
  getChatRoom,
  getChatRooms,
  getOneToOneChatRoom,
  createOneToOneChatRoom,
  createChatRoom,
  updateChatRoom
} = require('../services/chatRoom')
const {
  getUserInfoId
} = require('../services/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')
const {
  isChatRoomFailInfo,
  addChatRoomFailInfo,
  changeChatRoomInfoFailInfo,
  createChatRoomFailInfo
} = require('../model/ErrorInfo')

/**
 * 验证是否加入该方群
 * @param {Object} ctx koa ctx
 * @param {Number} roomId 群号
 * @returns {SuccessModel|ErrorModel} 返回成功或错误的对象
 */
async function isInChatRoom(ctx, {
  roomId
}) {
  let res = await getChatRoom({
    userId: ctx.session.userInfo.id,
    roomId
  })

  if (res) {
    return new SuccessModel()
  }

  return new ErrorModel(isChatRoomFailInfo)
}

/**
 * 验证群是否存在
 * @param {Number} roomId 群号
 * @returns {SuccessModel|ErrorModel} 返回成功或错误的对象
 */
async function isChatRoom({
  roomId
}) {
  let res = await getChatRoom({
    roomId
  })

  if (res) {
    return new SuccessModel()
  }

  return new ErrorModel(isChatRoomFailInfo)
}

/**
 * 获取与好友的聊天群号
 * @param {Object} ctx koa ctx
 * @param {Number} friendId 好友id
 * @returns {SuccessModel|ErrorModel} 返回成功或错误的对象
 */
async function getOneToOneChat(ctx, {
  friendId
}) {
  // 获取聊天
  let res1 = await getOneToOneChatRoom({
    userId: ctx.session.userInfo.id,
    friendId
  })
  // let res1
  // 如果是由对方发起的聊天也算
  let res2 = await getOneToOneChatRoom({
    userId: Number(friendId),
    friendId: ctx.session.userInfo.id
  })

  if (res1 || res2) {
    return new SuccessModel(res1 || res2)
  }

  return new ErrorModel(isChatRoomFailInfo)
}

/**
 * 加入房间
 * @param {Object} ctx koa ctx
 * @param {Number} roomId 群号
 * @returns {SuccessModel|ErrorModel} 返回成功或错误的对象
 */
async function addChatRoom(ctx, {
  roomId,
}) {
  // 该群是否存在 如果不存在则退出
  let isChatRoomRes = await isChatRoom({
    roomId
  })
  if (isChatRoomRes.errno !== 0) return isChatRoomRes

  // 是否已加入该群 如果已加入该群则退出
  let isInChatRoomRes = await isInChatRoom(ctx, {
    roomId
  })
  if (isInChatRoomRes.errno === 0) return isInChatRoomRes

  let getChatRoomRes = await getChatRoom({
    userId: ctx.session.userInfo.id,
    roomId
  })
  // getChatRoomRes.member 

  let res = await updateChatRoom({
    userId: ctx.session.userInfo.id,
    member,
  })

  if (res) {
    return new SuccessModel()
  }
  return new ErrorModel(addChatRoomFailInfo)
}

/**
 * 获取当前账号加入的群列表
 * @param {Object} ctx koa ctx
 * @param {Number} limit 每页显示条数
 * @param {Number} offset 跳过几条数据
 * @returns {SuccessModel|ErrorModel} 返回成功或错误的对象
 */
async function getChatRoomList(ctx, {
  offset = 0,
  limit = 10,
}) {
  let res = await getChatRooms({
    userId: ctx.session.userInfo.id,
    offset,
    limit,
  })

  if (res) {
    return new SuccessModel(res)
  }

  return new ErrorModel(getFriendListFailInfo)
}

/**
 * 修改信息
 * @param {Object} ctx koa ctx
 * @param {Number} roomId 群号
 * @param {Number} masterId 群主Id
 * @param {Array} member 群成员ID
 * @param {String} roomName 群名称
 * @param {String} avatar 群头像
 */
async function changeChatRoomInfo(ctx, {
  masterId,
  roomId,
  member,
  roomName,
  avatar,
}) {
  let res = await updateChatRoom({
    userId: ctx.session.userInfo.id,
    masterId,
    member,
    roomId,
    roomName,
    avatar,
  })

  if (res) {
    return new SuccessModel()
  }
  return new ErrorModel(changeChatRoomInfoFailInfo)
}

/**
 * 创建新的群
 * @param {Object} ctx koa ctx
 * @param {Array} member 群成员ID
 * @param {String} roomName 群名称
 * @param {String} avatar 群头像
 */
async function newOneToManyChatRoom(ctx, {
  member,
  roomName,
  avatar,
}) {
  let res = await createChatRoom({
    userId: ctx.session.userInfo.id,
    masterId: ctx.session.userInfo.id,
    roomName,
    avatar,
  })

  if (res) {
    return new SuccessModel(res)
  }
  return new ErrorModel(createChatRoomFailInfo)
}

/**
 * 创建新的聊天
 * @param {Object} ctx koa ctx
 * @param {Number} friendId 好友id
 */
async function newOneToOneChatRoom(ctx, {
  friendId: member,
}) {
  // 验证用户是否存在
  let isUser = await getUserInfoId({ userId: Number(member) })
  if (isUser.errno === 0) return new ErrorModel(createChatRoomFailInfo)

  let isChat = await getOneToOneChat(ctx, {
    userId: ctx.session.userInfo.id,
    friendId: Number(member)
  })
  if (isChat.errno === 0) return new ErrorModel(createChatRoomFailInfo)

  // 创建单人聊天
  let res = await createOneToOneChatRoom({
    userId: ctx.session.userInfo.id,
    friendId: member
  })

  if (res) {
    return new SuccessModel(res)
  }
  return new ErrorModel(createChatRoomFailInfo)
}

module.exports = {
  isChatRoom,
  addChatRoom,
  getOneToOneChat,
  newOneToManyChatRoom,
  newOneToOneChatRoom,
  isInChatRoom,
  getChatRoomList,
  changeChatRoomInfo,
}