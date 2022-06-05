require('dotenv').config()

const app = require('./app')

const port = process.env.PORT || 3000

app.listen(port, '0.0.0.0', (err, address) => {
  if (err) {
    throw err
  }
  console.log(`server listening on ${address}`)
})

module.exports = app
