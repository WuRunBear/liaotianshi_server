/**
 * @description 错误信息总和
 */

module.exports = {
  registerUserNameExistInfo: {
    errno: 10001,
    message: '用户名已存在'
  },
  loginFailInfo: {
    errno: 10002,
    message: '用户名或密码错误'
  },
  loginCheckFailInfo: {
    errno: 10003,
    message: '未登录'
  },
  registerUserFailInfo: {
    errno: 10004,
    message: '注册失败'
  },
  jsonSchemaFailInfo: {
    errno: 10005,
    message: '数据格式错误'
  },
  logoutFailInfo: {
    errno: 10006,
    message: '退出失败'
  },
  upLoadFailInfo: {
    errno: 10007,
    message: '上传失败'
  },
  selectUserFailInfo: {
    errno: 10008,
    message: '没有该用户'
  },
  isFriendFailInfo: {
    errno: 10009,
    message: '不是好友'
  },
  changeUserFailInfo: {
    errno: 10009,
    message: '修改用户信息失败'
  },
  selectUserThisFailInfo: {
    errno: 10010,
    message: '查询的是自己'
  },
  addFriendFailInfo: {
    errno: 10011,
    message: '添加好友失败'
  },
  socketSendchatMegFailInfo: {
    type: 10012,
    message: '发送信息失败'
  }
}