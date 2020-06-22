/**
 * @description 连接 redis 的方法 get set
 */

const redis = require('redis')
const {
  REDIS_CONF
} = require('../conf/db')

// 连接redis
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => console.error('redis error', err))

/**
 * redis set方法
 * @param {String} key redis中的key
 * @param {String} val redis中的值
 * @param {Number} timeout 过期时间 单位 秒
 * @returns null
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * redis get方法
 * @param {String} key redis中的key
 * @returns 
 */
function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
      }

      try {
        resolve(JSON.parse(val))
      } catch {
        resolve(val)
      }
    })
  })
}

module.exports = {
  set,
  get
}