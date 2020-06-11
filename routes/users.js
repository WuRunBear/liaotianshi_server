const router = require('koa-router')()
const {
  login,
  register,
  isExist,
  logout,
  selectUser,
  changeUserInfo,
  user_test
} = require('../controller/user')
const userValidata = require('../validator/user')
const {
  genValidator,
  loginCheck
} = require('../middlewares/middleware.js')

router.prefix('/api/users')

router.get('/', async (ctx, next) => {
  ctx.body = JSON.stringify(await user_test())
  // ctx.body = JSON.stringify(ctx.session)
  // ctx.body = JSON.stringify(ctx.request.files);
})

// 登录
router.post('/login', genValidator(userValidata), async (ctx, next) => {

  let {
    userName,
    password
  } = ctx.request.body

  let data = await login(ctx, userName, password)

  ctx.body = JSON.stringify(data)
})

// 注册
router.post("/register", genValidator(userValidata), async (ctx, next) => {

  let data = await register(ctx.request.body)

  ctx.body = JSON.stringify(data)
})

// 验证用户名是否存在
router.get('/isExist', genValidator(userValidata), async (ctx, next) => {
  let {
    userName
  } = ctx.query

  let data = await isExist(userName)

  ctx.body = JSON.stringify(data)
})

//查询用户
router.post('/selectUser', loginCheck, genValidator(userValidata), async (ctx, next) => {
  let data = await selectUser(ctx, ctx.request.body)

  ctx.body = JSON.stringify(data)
})

//修改用户信息
router.post('/changeUserInfo', loginCheck, genValidator(userValidata), async (ctx, next) => {

  let data = await changeUserInfo(ctx, ctx.request.body)

  ctx.body = JSON.stringify(data)
})

/**
 * 退出登录
 */
router.get('/logout', loginCheck, async (ctx, next) => {
  let data = await logout(ctx)

  ctx.body = JSON.stringify(data)
})

// 验证用户是否已经登录
router.get('/isLogin', loginCheck)

module.exports = router