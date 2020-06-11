const Sequelize = require('sequelize')
const seq = require('../seq')

// 用户表模型
let user = seq.define('user', {
  // 用户名
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  },
  // 密码
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '密码'
  },
  // 昵称
  nickName: {
    type: Sequelize.STRING,
    comment: '昵称'
  },
  // 头像地址
  avatar: {
    type: Sequelize.STRING,
    comment: '头像地址'
  },
  // 性别
  gender: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '性别，0为保密、1为男、2为女'
  },
  //地址
  city: {
    type: Sequelize.STRING,
    comment: '地址'
  }
});

module.exports = user