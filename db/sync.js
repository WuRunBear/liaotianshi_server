const seq = require('./seq')
const {
  user
} = require('./model/index')


seq.sync({
  force: true
}).then(async () => {

  const doCrypto = require('../utils/crypto')

  await user.create({
    userName: 'admin',
    nickName: 'Admin',
    password: doCrypto('123456'),
  })

  process.exit()
})