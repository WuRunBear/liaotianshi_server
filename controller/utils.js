/**
 * @description utils 保存文件等等。。。
 */

const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')
const {
  upLoadFailInfo
} = require('../model/ErrorInfo')
const {
  urlUploadResource
} = require('../conf/url')
/**
 * 上传文件
 * @param {Object} ctx koa ctx
 */
async function upload(ctx) {
  const files = ctx.request.files.files
  let {
    name,
    size,
    type
  } = files

  let res

  if (JSON.stringify(files) !== '{}') {
    res = new SuccessModel({
      name: `upload/${name}`,
      path: `${urlUploadResource}${name}`,
      size,
      type
    })
  } else {
    res = new ErrorModel(upLoadFailInfo)
  }

  return res
}

module.exports = {
  upload
}