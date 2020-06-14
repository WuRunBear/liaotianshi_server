const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redis = require('koa-redis')
const koaBody = require('koa-body')
const path = require('path')

const utils = require('./routes/utils')
const users = require('./routes/users')
const friends = require('./routes/friends')

const {
  getUploadDirName
} = require('./utils/getUploadDirname')
const {
  checkDirExist
} = require('./utils/checkDirExist')

const {
  REDIS_CONF
} = require('./conf/db')
const {
  SESSION_SECRET_KEY
} = require('./conf/secretKeys')
const {
  url
} = require('./conf/url')

// cors跨域
const cors = require('koa2-cors')
app.use(cors({
  origin: `${url}:8080`,
  credentials: true,
  maxAge: 24 * 60 * 60 * 1000
}))

// error handler
onerror(app)

app.use(koaBody({
  multipart: true,
  // encoding: 'gzip',
  formidable: {
    uploadDir: path.join(__dirname, 'public/upload/'),
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 0.5 * 1024 * 1024,
    multiples: true,
    onFileBegin: function (name, file) {

      let dirName = getUploadDirName(file.type)

      let dir = path.join(__dirname, `public/upload/${dirName.dir}/`);

      checkDirExist(dir)

      let fileNameArr = file.name.split('.')
      let fileName = `${dirName.fileName}.${fileNameArr[fileNameArr.length-1]}`

      dir = path.join(dir, fileName)

      file.path = dir
      file.name = `${dirName.dir}/${fileName}`
    }
  }
}))

// middlewares
// app.use(bodyparser({
//   enableTypes: ['json', 'form', 'text']
// }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// 配置session
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'myChat.sid', //浏览器中存储的cookie名 默认是‘koa.sid’
  prefix: 'myChat:sess:', //redis key的前缀 默认是‘koa:sess:’
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'Strict'
  },

  store: redis({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// socket
const
  IO = require('koa-socket-2'),
  koaRedis = require('socket.io-redis'),
  chat = new IO()

// socket
chat.attach(app)
app.io.adapter(koaRedis({
  key: 'mychat.io',
  host: REDIS_CONF.host,
  port: REDIS_CONF.port,
}));

// socket的路由
// require('./socket/socketRouter')(app.io, Object.assign({}, require('./socket/router/SocketRouters')))
app.io.use(require('./socket/socketRouter')(app.io, Object.assign({}, require('./socket/router/SocketRouters'))))

// routes
app.use(utils.routes(), utils.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(friends.routes(), friends.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app