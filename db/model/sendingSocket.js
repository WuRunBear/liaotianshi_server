const Sequelize = require('sequelize')
const seq = require('../seq')

let sendingSocket = seq.define('sendingSocket', {
  // 用户ID
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '用户ID，对应user表'
  },
  // 好友ID
  roomId: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '要发到哪'
  },
  data: {
    type: Sequelize.STRING,
    allowNull: false,
    comments: '发送的数据'
  },
  event: {
    type: Sequelize.STRING,
    allowNull: false,
    comments: '发送数据的socket事件名'
  }
})

module.exports = sendingSocket