module.exports = {
  async data(ctx, data) {
    try {
      ctx.socket.to('1').emit('receive', {
        data: ctx.data
      });
    } catch (error) {
      console.log(error);
    }
  },
  async addRoom(ctx, data) {
    try {
      ctx.socket.join(ctx.data.id)

    } catch (error) {
      console.log(error);
    }
  },
}