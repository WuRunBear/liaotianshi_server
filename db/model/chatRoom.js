const Sequelize = require('sequelize')
const seq = require('../seq')

// 用户表模型
let chatRoom = seq.define('chatRoom', {
  // 发起者id
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '聊天的发起者id'
  },
  // friendId: {
  //   type:Sequelize.INTEGER,
  //   allowNull: false,
  //   comment: ''
  // },
  // 群号
  roomId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    comment: '群号'
  },
  // 群主
  masterId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    comment: '群主的id'
  },
  // 成员
  member: {
    type: Sequelize.STRING,
    comment: '成员，数组形式'
  },
  // 群名称
  roomName: {
    type: Sequelize.STRING,
    comment: '群名称'
  },
  // 群头像地址
  avatar: {
    type: Sequelize.STRING,
    comment: '群头像地址'
  },
});

module.exports = chatRoom