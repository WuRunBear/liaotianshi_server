const os = require('os')

const WLAN = os.networkInterfaces().WLAN
const ip = WLAN[WLAN.length-1].address
const url = `http://${ip}`
// const url = `http://2583813ig5.qicp.vip`

module.exports = {
  url,
  urlStaticResource: `${url}:8081/`,
  urlUploadResource: `${url}:8081/upload/`,
  urlApi: `${url}:8081/api/`
}