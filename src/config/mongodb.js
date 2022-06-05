const mongoose = require('mongoose')

const mongo = mongoose.connect()

module.exports = {
  mongo
}
