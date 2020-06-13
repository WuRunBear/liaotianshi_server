const {
  getUserInfo,
  getUsersInfo,
  createUser,
  updateUser,
  getUser
} = require('../services/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')
const {
  registerUserNameExistInfo,
  loginFailInfo,
  registerUserFailInfo,
  logoutFailInfo,
  selectUserFailInfo,
  changeUserFailInfo,
  selectUserThisFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/crypto')

const {
  isFriend
} = require('./friend')

/**
 * 用户登录
 * @param {Object} ctx koa2 ctx
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
async function login(ctx, userName, password) {

  let res = await getUserInfo(userName, doCrypto(password))

  if (!res) {
    return new ErrorModel(loginFailInfo)
  }

  if (!ctx.session.userInfo) {
    ctx.session.userInfo = res
  }

  return new SuccessModel(res)
}

/**
 * 用户注册
 * @param {String} userName 用户名
 * @param {String} password 用户密码
 * @param {String} nickName 用户昵称
 * @param {Number} gender 用户性别
 * @param {String} avatar 用户头像地址
 */
async function register({
  userName,
  password,
  nickName,
  gender,
  avatar
}) {
  // 先确定用户名可用
  const isExistUserName = await isExist(userName)

  if (isExistUserName instanceof ErrorModel) {
    return isExistUserName
  }

  // 用户名可用，创建用户
  try {

    let res = await createUser({
      userName,
      password: doCrypto(password),
      nickName,
      gender,
      avatar
    })

    return new SuccessModel({
      id: res.id,
      userName: res.userName,
      nickName: res.nickName,
      avatar: res.avatar,
      gender: res.gender,
      updatedAt: res.updatedAt,
      createdAt: res.createdAt
    })

  } catch (error) {

    return new ErrorModel(registerUserFailInfo)
  }
}

/**
 * 验证用户名是否存在
 * @param {String} userName 用户名
 */
async function isExist(userName) {
  let userInfo = await getUserInfo(userName)

  if (!userInfo) {
    return new SuccessModel()
  }

  return new ErrorModel(registerUserNameExistInfo)
}

/**
 * 查询用户
 * @param {Object} ctx koa ctx
 * @param {String} selectText 搜索文本
 * @param {Number} pageSize 每页显示条数
 * @param {Number} page 页数
 */
async function selectUser(ctx, {
  selectText,
  selectMode = 0,
  pageSize = 10,
  page = 0,
}) {

  let isexist = await isExist(selectText)
  let isUserName = isexist.errno === 0

  if (ctx.session.userInfo.UserName === selectText) return new SuccessModel(selectUserThisFailInfo)

  switch (selectMode) {
    case 1:
      isUserName = false
      break;
    case 2:
      isUserName = true
      break;

    default:
      break;
  }

  if (!isUserName) {

    // 根据用户名查询
    let usersInfo = await getUserInfo(selectText)

    // // 验证是否为好友
    // let resFriend = await isFriend(ctx, {friendId:usersInfo.id})
    // if (!(resFriend instanceof ErrorModel)) {
    //   Object.assign(usersInfo, {
    //     friend: resFriend
    //   })
    // }

    if (usersInfo) {
      return new SuccessModel(usersInfo)
    }

  } else {

    // 根据昵称查询 不验证是否为好友
    let usersInfo = await getUsersInfo({
      nickName: selectText,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    })

    // for (let i = 0; i < usersInfo.rows.length; i++) {

    //   usersInfo.rows[i] = {
    //     id: usersInfo.rows[i].id,
    //     userName: usersInfo.rows[i].userName,
    //     nickName: usersInfo.rows[i].nickName,
    //     avatar: usersInfo.rows[i].avatar,
    //   }

    // }

    if (usersInfo.count > 0) {
      return new SuccessModel(usersInfo)
    }

  }

  return new ErrorModel(selectUserFailInfo)
}

/**
 * 更改用户数据
 * @param {Object} ctx koa ctx
 * @param {String} nickName 昵称
 * @param {String} avatar 头象
 * @param {String} gender 性别
 * @param {String} city 地址
 */
async function changeUserInfo(ctx, {
  nickName,
  gender,
  avatar,
  city
}) {
  let data = {
    nickName,
    gender,
    avatar,
    city
  }
  let res = await updateUser(Object.assign({
    userId: ctx.session.userInfo.id,
  }, data))

  if (res) {
    for (const key in res) {
      if (res.hasOwnProperty(key)) {
        const element = res[key];
        if (element && data[key]) ctx.session.userInfo[key] = element
      }
    }

    // if (nickName) ctx.session.userInfo.nickName = res.nickName
    // if (avatar) ctx.session.userInfo.avatar = res.avatar
    // if (gender) ctx.session.userInfo.gender = res.gender
    // if (city) ctx.session.userInfo.city = res.city

    return new SuccessModel()
  }

  return new ErrorModel(changeUserFailInfo)
}

/**
 * 退出登录
 * @param {Object} ctx koa2 ctx
 */
async function logout(ctx) {
  if (delete ctx.session.userInfo) {
    return new SuccessModel()
  }
  return new ErrorModel(logoutFailInfo)
}

/**
 * 获取所有用户信息 测试用
 */
async function user_test() {
  let userInfo = await getUser()

  return new SuccessModel(userInfo)
}
module.exports = {
  login,
  register,
  isExist,
  logout,
  selectUser,
  changeUserInfo,
  user_test
}