const Product = require('../schema/product')

const getProduct = (req, res) => {
  Product.find((err, products) => {
    if (err) {
      return res.status(500).send({ message: err })
    }
    return res.send(products)
  })
}

//com uma função do objeto Product consigo deletar
const deleteProduct = (req, res) => {
  Product.findOneAndDelete({ sku: req.params.sku }, (err, product) => {
    if (err) {
      return res.status(500).send({ message: err })
    }

    if (!product) return res.status(404).send({ message: 'Product doesnt exist' })

    return res.send({ message: 'Product has been deleted' })
  })
}

const postProduct = (req, res) => {
  const { sku, name, description, price } = req.body
  const product = new Product({
    sku,
    name,
    description,
    price
  })

  product.save((err, product) => {
    if (err) return res.status(500).send({ message: err })

    return res.send({ message: 'Product was registered successfully!' })
  })
}

//forma de consulta e edita ou consulta e edita ao mesmo tempo (delete moongose)
const patchProduct = (req, res) => {
  const { sku, name, description, price } = req.body
  const skuParam  = req.params.sku

  if (sku != skuParam) return res.send({ message: 'the Sku informed is different from the Sku passed as a parameter' }) //if arrumado

  Product.findOneAndUpdate({ sku }, { name, description, price }, (err, product) => {
    if (err) return res.status(500).send({ message: err }) //if arrumado

    if (!product) return res.status(404).send({ message: 'Product doesnt exists' }) //if arrumado

    return res.send({ message: 'Product was updated successfully!' })
  })
}

module.exports = {
  getProduct,
  deleteProduct,
  postProduct,
  patchProduct
}
