/**
 * @description 验证用户数据格式的中间件
 */

const {
  ErrorModel
} = require('../model/ResModel')
const {
  jsonSchemaFailInfo
} = require('../model/ErrorInfo')

/**
 * 验证用户数据 中间件
 * @param {Function} userValidata 验证数据的方法
 */
function genValidator(userValidata) {
  
  return async (ctx, next) => {
    let data = JSON.stringify(ctx.request.body) === '{}' ? ctx.query : ctx.request.body
    let err = userValidata(data)
    
    if (err) {
      ctx.body = new ErrorModel(jsonSchemaFailInfo)
      return
    }

    await next()
  }
}

module.exports = {
  genValidator
}