const {
  SuccessModel,
  ErrorModel
} = require('../../model/ResModel')

module.exports = {
  // 加入房间
  async addRoom(ctx, data = {}) {
    try {
      // 加入房间
      if (data.roomId) {
        ctx.socket.join(data.roomId)
        ctx.socket.adapter.clients(['1'], (err, clients) => {
          console.log(clients); // an array containing socket ids in 'room1' and/or 'room2'
        });
        // ctx.socket.adapter.allRooms((err, rooms) => {
        //   console.log(rooms); // an array containing all rooms (accross every node)
        // })
      }
    } catch (error) {
      console.log(error);
    }
  },
  async data(ctx, data = {}) {
    try {

      ctx.socket.broadcast.to(data.roomId).emit('msg', new SuccessModel(data));
    } catch (error) {
      console.log(error);
    }
  },
}