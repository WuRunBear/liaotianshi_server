const user = require('./user')
const friend = require('./friend')
const chatRoom = require('./chatRoom')
const sendingSocket = require('./sendingSocket')

// 创建外键
// 用户表与好友表的外键
friend.belongsTo(user, {
  foreignKey: 'userId'
})
friend.belongsTo(user, {
  foreignKey: 'friendId'
})
user.hasMany(friend, {
  foreignKey: 'friendId'
})
// user.hasMany(friend, {
//   foreignKey: "userId"
// })

// 用户表与聊天房间表的外键
chatRoom.belongsTo(user, {
  foreignKey: 'userId'
})
chatRoom.belongsTo(user, {
  foreignKey: 'masterId'
})
user.hasMany(chatRoom, {
  foreignKey: 'userId'
})
user.hasMany(chatRoom, {
  foreignKey: 'masterId'
})

// 待发送socket数据表与用户表的外键
sendingSocket.belongsTo(user, {
  foreignKey: 'userId'
})


// 导出所有表模型
module.exports = {
  user,
  friend,
  chatRoom,
  sendingSocket
}