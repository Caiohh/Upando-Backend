const Product = require("../schema/product")

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
    return res.code(200).send('OK')
}

const postProduct = (req, res) => {
const{sku,name,description,price}=req.body
    const product = new Product({
        sku,
        name,
        description,
        price
    })

    product.save((err, product) => {
        if (err) {
            return res.status(500).send({ message: err })
        }
        return res.send({ message: 'Product was registered successfully!' })
      })
    }


//forma de consulta e edita ou consulta e edita ao mesmo tempo (delete moongose)
const patchProduct = (req, res) => {
    return res.code(200).send('OK')
}

module.exports = {
    getProduct,
    deleteProduct,
    postProduct,
    patchProduct
}