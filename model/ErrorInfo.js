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
  },
  addFriendFailIsFriendInfo: {
    type: 10013,
    message: '已经是好友'
  },
  changeFriendFailInfo: {
    errno: 10014,
    message: '修改好友信息失败'
  },
  getFriendListFailInfo: {
    errno: 10015,
    message: '还没有好友'
  },
  socketAddRoomFailInfo: {
    errno: 10016,
    message: '加入聊天失败'
  },
  isChatRoomFailInfo: {
    errno: 10017,
    message: '该聊天不存在'
  },
  isInChatRoomFailInfo: {
    type: 10018,
    message: '已在该聊天'
  },
  addChatRoomFailInfo: {
    type: 10019,
    message: '加入聊天失败'
  },
  changeChatRoomInfoFailInfo:{
    type: 10020,
    message: '修改聊天信息失败'
  },
  createChatRoomFailInfo:{
    type: 10021,
    message: '新建聊天失败'
  },
  getOneChatRoomFailInfo:{
    type: 10022,
    message: '获取聊天信息失败'
  },
}