const Ajv = require('ajv')
const ajv = new Ajv()

function _validata(schema, data = {}) {
  const valid = ajv.validate(schema, data)

  if (!valid) return ajv.errors
}

module.exports = _validata