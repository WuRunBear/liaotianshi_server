const {
  SuccessModel,
  ErrorModel
} = require('../../model/ResModel')

module.exports = {
  async connect(socket) {},
  async disconnect() {},
  // 加入房间
  async addRoom(ctx, data = {}) {
    try {

      // 加入房间
      if (data.roomId) {
        let roomId = `roomId_${data.roomId}`

        ctx.socket.join(roomId)

        // 确认是否成功加入
        ctx.socket.adapter.clients([roomId], (err, clients) => {
          if (err) console.error(err)

          // 如果成功加入执行ctx.acknowledge
          if (clients.includes(ctx.socket.id)) ctx.acknowledge && ctx.acknowledge()
        })
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 发送聊天消息
  async sendChatMsg(ctx, data = {}) {
    try {
      if (data.friendId || data.roomId) {
        let roomId = data.friendId ? `userId_${data.friendId}` : `roomId_${data.roomId}`

        // 返回聊天消息给客户端
        data.userId = ctx.userInfo.id
        ctx.socket.broadcast.to(roomId).emit('getChatMsg', new SuccessModel(data));

        // 数据成功到达执行ctx.acknowledge函数
        ctx.acknowledge && ctx.acknowledge()
      }
    } catch (error) {
      console.error(error);
    }
  },

  // 添加好友
  async addFriend(ctx, data = {}) {
    try {
      if (data.friendId) {

        data.msg = '有人请求添加你为好友'
        data.friendInfo = ctx.userInfo

        ctx.socket.to(`userId_${data.friendId}`).emit('getAddFriend', new SuccessModel(data));

        // 数据成功到达执行ctx.acknowledge函数
        ctx.acknowledge && ctx.acknowledge()
      }
    } catch (error) {
      console.error(error);
    }
  }
}