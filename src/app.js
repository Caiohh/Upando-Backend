const fastify = require('fastify')
const authController = require('./controller/auth')

const app = fastify({})
app.register(require('@fastify/helmet'))

app.head('/', (request, reply) => reply.code(200).send(''))

//app.get('/', (request, reply) => reply.code(200).send('OK'))

app.get('/:idade', authController.caio)

app.post('/signin', authController.signin)
app.post('/signup', (request, reply) => reply.code(200).send('OK'))
app.post('/signout', (request, reply) => reply.code(200).send('OK'))

app.get('/product', (request, reply) => reply.code(200).send('OK'))
app.post('/product', (request, reply) => reply.code(200).send('OK'))
app.patch('/product/:sku', (request, reply) => reply.code(200).send('OK'))
app.delete('/product/:sku', (request, reply) => reply.code(200).send('OK'))

app.setErrorHandler(function (error, request, reply) {
  reply.send(error)
})

module.exports = app
