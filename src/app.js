const fastify = require('fastify')
const authController = require('./controller/auth')
const { checkDuplicateUsernameOrEmail, verifyToken } = require('./hook/auth')

const app = fastify({})
app.register(require('@fastify/helmet'))

app.head('/', (request, reply) => reply.code(200).send(''))

app.get('/', (request, reply) => reply.code(200).send('OK'))

app.post('/signin', authController.signin)
app.post('/signup', { preHandler: [checkDuplicateUsernameOrEmail] }, authController.signup)

app.get('/product', { preHandler: [verifyToken] }, (request, reply) => reply.code(200).send('OK'))
app.post('/product', (request, reply) => reply.code(200).send('OK'))
app.patch('/product/:sku', (request, reply) => reply.code(200).send('OK'))
app.delete('/product/:sku', (request, reply) => reply.code(200).send('OK'))

app.setErrorHandler(function (error, request, reply) {
  reply.send(error)
})

module.exports = app
