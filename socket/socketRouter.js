const {
  get
} = require('../cache/redis')
const getCookie = require('../utils/getCookie')

/**
 * 路由处理
 * @param {IO} io koa socket io实例
 * @param {Object} routes 路由
 */
module.exports = function (io, routes) {
  // 用户连接时进行的操作
  io.on('connection', async (socket) => {

    // 先确认redis中有无用户数据 有添加到上下文中并继续  否则return不采取操作
    let userInfo = await _getUserInfo(socket.handshake.headers.cookie)
    if (userInfo) {
      let roomId = `userId_${userInfo.id}`

      // 将连接的用户加入到redis中用户数据的对应Id房间中
      socket.join(roomId)
    }

    return
  })

  // 注册事件
  Object.keys(routes).forEach((route) => {
    io.on(route, routes[route]); // register event
  });
  return async (ctx, next) => {
    // 先确认redis中有无用户数据 有添加到上下文中并继续  否则return不采取操作
    let userInfo = await _getUserInfo(ctx.socket.handshake.headers.cookie)
    if (userInfo) {
      ctx.userInfo = userInfo

      await next();

    }

    return
  };
}

/**
 * 获取redis中的用户数据
 * @param {String} cookie 上传的cookie
 */
async function _getUserInfo(cookie) {

  // 获取cookie
  let cookies = getCookie(cookie)
  // 根据cookie获取登录的用户数据
  let redisData = await get(`myChat:sess:${cookies['myChat.sid']}`)

  if (redisData && redisData.userInfo) {
    return redisData.userInfo
  }
  return {}
}