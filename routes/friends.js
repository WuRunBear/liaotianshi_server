const router = require('koa-router')()
const {
  addFriend,
  isFriend,
  getFriendList
} = require('../controller/friend')
const {
  genValidator,
  loginCheck
} = require('../middlewares/middleware.js')

router.prefix('/api/friend')


router.get('/', loginCheck, async (ctx, next) => {
  
  let data = await getFriendList(ctx)

  ctx.body = data
})
router.post('/isFriend', loginCheck, async (ctx, next) => {
  
  let data = await isFriend(ctx,ctx.request.body)

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
module.exports = router