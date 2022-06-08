const mongoose = require('mongoose')

const mongo = mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error connection: ', err))

module.exports = mongo
