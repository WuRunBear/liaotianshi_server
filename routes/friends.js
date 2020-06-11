const router = require('koa-router')()
const {
  addFriend,
  isFriend
} = require('../controller/friend')
const {
  genValidator,
  loginCheck
} = require('../middlewares/middleware.js')

router.prefix('/api/friend')

// 是否为好友
router.post('/isFriend', loginCheck, async (ctx, next) => {
  
  let data = await isFriend(ctx,ctx.request.body)

  ctx.body = data
})

// 添加好友
router.post('/addFriend', loginCheck, async (ctx, next) => {

  let data = await addFriend(ctx, ctx.request.body)

  ctx.body = data
})

module.exports = router