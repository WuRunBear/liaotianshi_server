const path = require('path')
const fs = require('fs')

module.exports = {
  checkDirExist: function (dirName) {
    let res

    fs.mkdirSync(dirName, {
      recursive: true,
    }, (err) => {
      if (err) throw err;
      res = true
    })

    return res
  }
}