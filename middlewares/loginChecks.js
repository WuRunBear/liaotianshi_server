/**
 * @description 登录验证的中间件
 */
const {
  ErrorModel,
  SuccessModel
} = require('../model/ResModel')
const {
  loginCheckFailInfo
} = require('../model/ErrorInfo')


async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {

    ctx.body = new SuccessModel(ctx.session.userInfo)

    await next()
    return
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

module.exports = {
  loginCheck
}