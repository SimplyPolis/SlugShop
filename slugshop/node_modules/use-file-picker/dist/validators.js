
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./validators.cjs.production.min.js')
} else {
  module.exports = require('./validators.cjs.development.js')
}
