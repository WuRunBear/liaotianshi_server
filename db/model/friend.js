const Sequelize = require('sequelize')
const seq = require('../seq')

let friend = seq.define('friend', {
  // 用户ID
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '用户ID，对应user表'
  },
  // 好友ID
  friendId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '好友的ID，对应user表'
  },
  // 备注
  alias: {
    type: Sequelize.STRING,
    comment: '备注'
  },
  // 黑名单
  blackList:{
    type:Sequelize.BOOLEAN,
    allowNull: false,
    comment:'是否加入黑名单'
  }
})

module.exports = friend