const router = require('koa-router')()
const {
  isInChatRoom,
  isChatRoom,
  addChatRoom,
  getChatMode,
  getChatRoomList,
  getOneChatRoom,
  newChatRoom,
  getOneToOneChat,
  newOneToOneChatRoom
} = require('../controller/chatRoom')
const {
  genValidator,
  loginCheck
} = require('../middlewares/middleware.js')

router.prefix('/api/chatRooms')

// 群是否存在
router.get('/isChatRoom', loginCheck, async (ctx, next) => {
  let data = await isChatRoom(ctx, ctx.query)

  ctx.body = data
})

// 是否在群里
router.get('/isInChatRoom', loginCheck, async (ctx, next) => {

  let data = await isInChatRoom(ctx, ctx.query)

  ctx.body = data
})

// 获取聊天模式（群聊、私聊）
router.get('/getChatMode', loginCheck, async (ctx, next) => {

  let data = await getChatMode(ctx, ctx.query)

  ctx.body = data
})

// 加入群
router.post('/addChatRoom', loginCheck, async (ctx, next) => {
  let data = await addChatRoom(ctx, ctx.request.body)

  ctx.body = data
})

// 新建群
router.post('/newChatRoom', loginCheck, async (ctx, next) => {
  let data = await newChatRoom(ctx, ctx.request.body)

  ctx.body = data
})

// 新建单人聊天
router.post('/newOneToOneChat', loginCheck, async (ctx, next) => {
  let data = await newOneToOneChatRoom(ctx, ctx.request.body)

  ctx.body = data
})

// 获取单人聊天
router.post('/getOneToOneChat', loginCheck, async (ctx, next) => {
  let data = await getOneToOneChat(ctx, ctx.request.body)

  ctx.body = data
})

// 通过群号获取群信息
router.post('/getChatRoom', loginCheck, async (ctx, next) => {

  let data = await getOneChatRoom(ctx, ctx.request.body)

  ctx.body = data
})

// // 修改信息
// router.post('/changeFriendInfo', loginCheck, async (ctx, next) => {
//   let data = await changeFriendInfo(ctx, ctx.request.body)

//   ctx.body = data
// })
module.exports = router