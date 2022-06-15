const mongoose = require('mongoose')
const User = mongoose.model(
  'User',
  new mongoose.Schema({
    username: String,
    cpf: String,
    birthDate: String,
    telephone:Number,
    postalCode: String,
    houseNumber: Number,
    Complement: String,
    Reference: String,
    email: String,
    password: String
  })
)
module.exports = User
