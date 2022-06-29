const fastify = require('fastify')
const authController = require('./controller/auth')
const { checkDuplicateUsernameOrEmail, verifyToken } = require('./hook/auth')
const productController = require('./controller/product')

const app = fastify({})
app.register(require('@fastify/helmet'))
app.register(require('@fastify/cors'), {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
})

app.head('/', (request, reply) => reply.code(200).send(''))

app.get('/', (request, reply) => reply.code(200).send('OK'))

app.post('/signin', authController.signin)
app.post('/signup', { preHandler: [checkDuplicateUsernameOrEmail] }, authController.signup)

app.get('/product', { preHandler: [verifyToken] }, productController.getProduct)
app.post('/product', { preHandler: [verifyToken] }, productController.postProduct)
app.patch('/product/:sku', { preHandler: [verifyToken] }, productController.patchProduct)
app.delete('/product/:sku', { preHandler: [verifyToken] }, productController.deleteProduct)
app.setErrorHandler(function (error, request, reply) {
  reply.send(error)
})

module.exports = app
