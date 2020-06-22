// 用户表模型
const {
  user,
  friend
} = require('../db/model/index')
const {
  formatUser
} = require('./_format')
const Op = require('sequelize').Op

/**
 * 获取用户信息
 * @param {Number} userId 用户id
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
async function getUserInfo({
  userId,
  userName,
  password
}) {
  // 查询条件
  let where = {
    userName
  }

  // 如果有传密码进来就加上
  if (password) {
    Object.assign(where, {
      password
    })
  }

  let info = {
    attributes: ['id', 'userName', 'nickName', 'avatar', 'gender', 'city'],
    where
  }

  if (userId) {
    Object.assign(info, {
      include: [{
        attributes: ['id', 'userId', 'friendId', 'alias', 'blackList'],
        model: friend,
        required: false,
        where: {
          userId
        }
      }],
    })
  }

  // 查询用户
  let result = await user.findOne(info)

  if (result) {
    return formatUser(result.dataValues)
  }

  return result
}

/**
 * 以昵称查询用户信息并分页
 * @param {String} nickName 昵称
 * @param {Number} limit 每页显示条数
 * @param {Number} offset 跳过几条数据
 */
async function getUsersInfo({
  nickName,
  offset = 0,
  limit = 10
}) {
  let where

  if (nickName) {
    where = {
      nickName: {
        [Op.like]: `%${nickName}%`
      }
    }
  }

  const result = await user.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'avatar', 'gender'],
    where,
    limit,
    offset,
    order: [
      ['id']
    ]
  })

  if (result) {
    result.rows = formatUser(result.rows)
    return result
  }
  return result
}

/**
 * 创建用户 
 * @param {String} userName 用户名
 * @param {String} password 用户密码
 * @param {String} nickName 用户昵称
 * @param {Number} gender 用户性别
 * @param {String} avatar 用户头像地址
 */
async function createUser({
  userName,
  password,
  nickName,
  gender,
  avatar
}) {
  let result = await user.create({
    userName,
    password,
    nickName,
    gender,
    avatar
  })

  if (result) {
    return result.dataValues
  }

  return result
}

/**
 * 修改用户名
 * @param {String} userId 用户id
 * @param {String} nickName 昵称
 * @param {String} password 密码
 * @param {String} avatar 头象
 * @param {String} gender 性别
 * @param {String} city 地址
 */
async function updateUser({
  userId,
  nickName,
  password,
  avatar,
  gender,
  city
}) {
  let updateData = {},
    where = {
      id: userId
    }

  if (nickName) updateData.nickName = nickName
  if (password) updateData.password = password
  if (avatar) updateData.avatar = avatar
  if (gender) updateData.gender = gender
  if (city) updateData.city = city

  let result = await user.update(updateData, {
    where
  })

  if (result) {

    return formatUser({
      nickName,
      password,
      avatar,
      gender,
      city
    })
  }
}

/**
 * 查询所有用户  测试用
 */
async function getUser() {

  // 查询用户
  let result = await user.findAll({})

  if (result) {
    return result
  }

  return result
}
module.exports = {
  getUserInfo,
  getUsersInfo,
  createUser,
  updateUser,
  getUser
}