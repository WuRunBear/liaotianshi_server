// 好友表模型
const {
  chatRoom
} = require('../db/model/index')
const Op = require('sequelize').Op
const { formatChatRoom } = require('./_format')

/**
 * 获取一个用户加入的聊天室
 * @param {Number} userId 用户id
 * @param {Number} friendId 好友id
 * @param {Number} roomId 群号
 * @returns {Object|null} 返回数据或空
 */
async function getChatRoom({
  userId,
  roomId,
  friendId
}) {
  // 如果userId不是数值类型就返回
  if (typeof userId !== 'number') return

  let where = {
    roomId,
  }

  // 如果userId 存在就添加
  if (userId) {
    Object.assign(where, {
      [Op.or]: [
        {
          member: {
            [Op.like]: `%,${userId}%`
          },
        },
        {
          member: {
            [Op.like]: `%[${userId}`
          },
        },
        {
          member: {
            [Op.like]: `${userId}]%`
          },
        },
        {
          member: {
            [Op.like]: `%${friendId}%`
          },
        }
      ]
    })
  }

  let result = await chatRoom.findOne({
    attributes: ['id', 'userId', 'masterId', 'member', 'roomName', 'avatar'],
    where
  })

  if (result) {
    return formatChatRoom(result.dataValues)
  }

  return
}

/**
 * 获取用户加入的所有聊天室
 * @param {Number} userId 用户id
 * @param {Number} limit 每页显示条数
 * @param {Number} offset 跳过几条数据
 * @returns {Object|null} 返回数据或空
 */
async function getChatRooms({
  userId,
  offset = 0,
  limit = 10,
}) {
  // 如果userId不是数值类型就返回
  if (typeof userId !== 'number') return

  let where = {
    [Op.or]: [
      {
        member: {
          [Op.like]: `%,${userId}%`
        },
      },
      {
        member: {
          [Op.like]: `%[${userId}`
        },
      },
      {
        member: {
          [Op.like]: `${userId}]%`
        },
      }
    ]
  }

  let result = await chatRoom.findAndCountAll({
    attributes: ['id', 'userId', 'masterId', 'member', 'roomName', 'avatar'],
    limit,
    offset,
    where
  })

  if (result.count > 0) {
    return formatChatRoom(result.dataValues)
  }

  return
}

/**
 * 获取私聊
 * @param {Number} userId 用户id
 * @param {Number} friendId 好友账号
 * @returns {Object|null} 返回数据或空
 */
async function getOneToOneChatRoom({
  userId,
  friendId
}) {
  // 如果userId不是数值类型就返回
  if (typeof userId !== 'number') return

  let where = {
    userId,
  }

  // 如果userId 存在就添加
  if (userId) {
    Object.assign(where, {
      friendId: {
        [Op.like]: `%${friendId}%`
      }
    })
  }

  let result = await chatRoom.findOne({
    attributes: ['id', 'userId', 'roomId', 'roomId'],
    where
  })

  if (result) {
    return formatChatRoom(result.dataValues)
  }

  return
}

/**
 * 创建私聊
 * @param {Number} userId 用户id
 * @param {Number} friendId 好友id
 * @returns {Object|null} 返回数据或空
 */
async function createOneToOneChatRoom({
  userId,
  friendId
}) {
  let roomId = _getRoomId()
  // 如果userId不是数值类型就返回
  if (typeof userId !== 'number') return

  // 创建房间
  let result = await chatRoom.create({
    userId,
    roomId,
    member: friendId.toString()
  })

  if (result) {
    // 只返回群号
    return { roomId: result.dataValues.roomId }
  }
  return
}

/**
 * 创建群聊
 * @param {Number} userId 用户id
 * @param {Number} masterId 群主Id
 * @param {String} roomName 群名称
 * @param {String} avatar 群头像
 * @returns {Object|null} 返回数据或空
 */
async function createChatRoom({
  userId,
  masterId,
  member,
  avatar,
  roomName = '',
}) {
  let roomId = _getRoomId() //, member = `[${userId}]`
  // 如果userId不是数值类型就返回
  if (typeof userId !== 'number') return

  // 创建房间
  let result = await chatRoom.create({
    userId,
    roomId,
    masterId,
    member,
    avatar,
    roomName,
  })

  if (result) {
    // 只返回群号
    return { roomId: result.dataValues.roomId }
  }
  return
}

/**
 * 修改信息
 * @param {Number} userId 用户id
 * @param {Number} roomId 群号
 * @param {Number} masterId 群主id
 * @param {String} member 成员
 * @param {String} roomName 群名称
 * @param {String} avatar 群图片url
 * @returns {Boolean} 返回布尔型
 */
async function updateChatRoom({
  userId,
  roomId,
  masterId,
  member,
  roomName,
  avatar,
}) {
  // 如果userId不是数值类型就返回
  if (typeof userId !== 'number' && typeof roomId !== 'number') return

  // 如果不是字符串形式就转换成字符串
  if (typeof member !== 'string') {
    try {
      member = JSON.stringify(member)
    } catch (error) {
      // 如果转换出错就只添加自己
      member = [userId]
    }
  }

  // 要更新的数据和条件
  let updateData = { friendId: null }, where = {
    roomId,
    [Op.and]: {
      [Op.like]: {
        member: `%,${userId},%`
      }
    }
  }

  // 跟新的信息
  if (masterId) updateData.masterId = masterId
  if (member) updateData.member = member
  if (roomName) updateData.roomName = roomName
  if (avatar) updateData.avatar = avatar

  let result = await chatRoom.update(updateData, {
    where
  })

  if (result) {
    return true
  }
  return false
}

module.exports = {
  getChatRoom,
  getChatRooms,
  getOneToOneChatRoom,
  createOneToOneChatRoom,
  createChatRoom,
  updateChatRoom
}

// 获取随机群号
function _getRoomId() {
  return Math.random().toString().split('.')[1].slice(0, 6)
}