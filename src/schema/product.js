const mongoose = require('mongoose')
const Product = mongoose.model(
  'Product',
  new mongoose.Schema({
    sku: Number,
    name: String,
    description: String,
    price: Number
  })
)
module.exports = Product
