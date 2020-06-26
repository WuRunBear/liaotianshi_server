const {
  SuccessModel,
  ErrorModel
} = require('../../model/ResModel')
const {
  socketSendchatMegFailInfo
} = require('../../model/ErrorInfo')
const {
  getSocketDatas,
  createSocketData,
  delSocketData,
} = require('../../services/sendingSocket')

module.exports = {
  async connect(socket) {},
  async disconnect(e) {},
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
      if (data.roomId) {
        let roomId = `roomId_${data.roomId}`,
          event = 'getChatMsg'

        data.userId = ctx.userInfo.id

        // 将数据添加到数据库中 因为不确定是不是发送成功
        // let res = await createSocketData({
        //   roomId,
        //   data,
        //   event
        // })

        // 返回聊天消息给客户端
        ctx.socket.broadcast.to(roomId).emit(event, new SuccessModel(data));
        // 数据成功到达执行ctx.acknowledge函数
        ctx.acknowledge && ctx.acknowledge(new SuccessModel())
      } else {
        ctx.acknowledge && ctx.acknowledge(new ErrorModel(socketSendchatMegFailInfo))
      }
    } catch (error) {
      console.error(error);
    }
  },

  // 添加好友
  async addFriend(ctx, data = {}) {
    try {
      if (data.friendId) {
        let roomId = `userId_${data.friendId}`,
          event = 'getAddFriend'

        data.msg = '有人请求添加你为好友'
        data.friendInfo = ctx.userInfo

        // 将数据添加到数据库中 因为不确定是不是发送成功
        let res = await createSocketData({
          userId: data.friendId,
          roomId,
          data,
          event
        })

        // 返回消息给客户端
        ctx.socket.to(roomId).emit(event, new SuccessModel(data));

        // 数据成功到达执行ctx.acknowledge函数
        ctx.acknowledge && ctx.acknowledge()
      }
    } catch (error) {
      console.error(error);
    }
  },

  // 客户端是否成功接收数据
  async getSuccess(ctx, data) {
    try {
      if (typeof data === 'number') {

        await delSocketData({
          id: data,
          userId: ctx.userInfo.id
        })
      }
    } catch (error) {
      console.error(error);
    }
  },

}