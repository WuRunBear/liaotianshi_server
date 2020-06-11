module.exports = {
  getUploadDirName: function (type) {
    type = type.split('/')[0]

    let date = new Date()
    let month = Number.parseFloat(date.getMonth()) + 1
    month = month.toString().length > 1 ? month : `0${month}`
    let dir = `${date.getFullYear()}${month}${date.getDate()}/${type}`

    return {
      dir,
      fileName: `${date.getFullYear()}${month}${date.getDate()}` + Math.random().toString().replace(/\./, '')
    }
  }
}