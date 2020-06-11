const user = require('./user')
const friend = require('./friend')

// 创建外键
friend.belongsTo(user, {
  foreignKey: 'userId'
})
friend.belongsTo(user, {
  foreignKey: 'friendId'
})
user.hasMany(friend, {
  foreignKey: "userId"
})
user.hasMany(friend, {
  foreignKey: 'friendId'
})

// 导出所有表模型
module.exports = {
  user,
  friend
}