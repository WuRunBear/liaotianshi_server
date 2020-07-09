const router = require('koa-router')()
const {
  isInChatRoom,
  isChatRoom,
  addChatRoom,
  getChatRoomList,
  getOneToOneChat,
  newOneToOneChatRoom
} = require('../controller/chatRoom')
const {
  genValidator,
  loginCheck
} = require('../middlewares/middleware.js')

router.prefix('/api/chatRoom')

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

// // 删除好友
// router.post('/removeFriend', loginCheck, async (ctx, next) => {

//   // let data = await addFriend(ctx, ctx.request.body)

//   ctx.body = '删除好友'
// })

// // 修改信息
// router.post('/changeFriendInfo', loginCheck, async (ctx, next) => {
//   let data = await changeFriendInfo(ctx, ctx.request.body)

//   ctx.body = data
// })
module.exports = router