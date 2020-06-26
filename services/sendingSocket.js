// 用户表模型
const {
  sendingSocket
} = require('../db/model/index')
const Op = require('sequelize').Op

/**
 * 获取待发送的socket数据
 * @param {Number} userId 用户id
 */
async function getSocketDatas(userId) {
  // 查询条件
  let where = {
    userId
  }

  // 查询用户
  let result = await sendingSocket.findAll({
    attributes: ['id', 'userId', 'roomId', 'data','event'],
    where
  })

  if (result) {
    return result
  }

  return
}

/**
 * 添加待发送的socket数据 
 * @param {Number} userId 用户id
 * @param {String} roomId 房间名
 * @param {String} data 数据
 * @param {String} event 发送数据的socket事件名
 */
async function createSocketData({
  userId,
  roomId,
  data,
  event
}) {

  if (data instanceof Object) {
    try {
      data = JSON.stringify(data)
    } catch (error) {}
  }

  let result = await sendingSocket.create({
    userId,
    roomId,
    data,
    event
  })

  if (result) {
    return result.dataValues
  }

  return
}

/**
 * 删除已发送的socket数据 
 * @param {Number} id id
 * @param {Number} userId 用户id
 */
async function delSocketData({
  id,
  userId,
}) {
  // 删除条件
  let where = {
    id,
    userId
  }

  // 删除
  let result = await sendingSocket.destroy({
    where
  })

  if (result) {
    return result
  }

  return
}
module.exports = {
  getSocketDatas,
  createSocketData,
  delSocketData,
}