const router = require('koa-router')()
const {
  addFriend,
  isFriend,
  getFriendList,
  changeFriendInfo
} = require('../controller/friend')
const {
  genValidator,
  loginCheck
} = require('../middlewares/middleware.js')

router.prefix('/api/friend')

// 获取好友列表
router.get('/getFriendList', loginCheck, async (ctx, next) => {

  let data = await getFriendList(ctx)

  ctx.body = data
})

// 是否好友
router.post('/isFriend', loginCheck, async (ctx, next) => {

  let data = await isFriend(ctx, ctx.request.body)

  ctx.body = data
})

// 添加好友
router.post('/addFriend', loginCheck, async (ctx, next) => {

  let data = await addFriend(ctx, ctx.request.body)

  ctx.body = data
})

// 删除好友
router.post('/removeFriend', loginCheck, async (ctx, next) => {

  // let data = await addFriend(ctx, ctx.request.body)

  ctx.body = '删除好友'
})

// 修改信息
router.post('/changeFriendInfo', loginCheck, async (ctx, next) => {
  let data = await changeFriendInfo(ctx, ctx.request.body)

  ctx.body = data
})
module.exports = router