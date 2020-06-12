const env = process.env.NODE_ENV

let
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    dataBase: 'mychat'
  },
  REDIS_CONF = {}

// 开发环境
if (env === 'dev') {
  // mysql配置
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    dataBase: 'mychat'
  }

  // redis配置
  REDIS_CONF = {
    port: 6379,
    host: 'localhost'
  }
}

// 生产环境
if (env === 'pro') {
  // mysql配置
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    dataBase: 'mychat'
  }

  // redis配置
  REDIS_CONF = {
    port: 6379,
    host: 'localhost'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}