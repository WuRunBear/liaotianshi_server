const router = require('koa-router')()

const {
  upload
} = require('../controller/utils')

router.prefix('/api/utils')

/**
 * 上传文件
 */
router.post('/upload', async (ctx, next) => {
  let res = await upload(ctx)
  ctx.body = res
});

module.exports = router