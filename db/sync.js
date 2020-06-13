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
  await user.create({
    userName: 'test1',
    nickName: 'test1',
    password: doCrypto('123456'),
  })
  await user.create({
    userName: 'test2',
    nickName: 'test2',
    password: doCrypto('123456'),
  })

  process.exit()
})