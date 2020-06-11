const os = require('os')

const WLAN = os.networkInterfaces().WLAN
const ip = WLAN[WLAN.length-1].address
const url = `http://${ip}/`

module.exports = {
  url,
  urlStaticResource: `${url}public/`,
  urlUploadResource: `${url}public/upload/`,
  urlApi: `${url}api/`
}