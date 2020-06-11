const validata = require('./_validata')

/**
 * 校验规则
 */
let schema = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[0-9A-Za-z]{5,12}$',
      maxLength: 12,
      minLength: 5
    },
    password: {
      type: 'string',
      maxLength: 16,
      minLength: 6
    },
    nickName: {
      type: 'string',
      maxLength: 12,
      minLength: 1
    },
    avatar: {
      type: 'string',
      pattern: '^$|[a-zA-z]+://[^\s]*',
      maxLength: 255,
      minLength: 0
    },
    gender: {
      type: 'number',
      maxLength: 2,
      minLength: 0
    }
  }
}

/**
 * 检验用户数据
 * @param {Object} data 待的检验用户数据
 */
function userValidata(data = {}) {

  return validata(schema, data)
}

module.exports = userValidata