const Sequelize = require('sequelize')
const {
  MYSQL_CONF
} = require('../conf/db')

// 创建数据库连接
const seq = new Sequelize(MYSQL_CONF.dataBase, MYSQL_CONF.user, MYSQL_CONF.password, {
  host: MYSQL_CONF.host,
  dialect: 'mysql'
})

module.exports = seq