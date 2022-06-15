const jwt = require('jsonwebtoken')
const config = require('../config/auth.js')
const User = require('../schema/user')

verifyToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' })
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' })
    }
    req.userId = decoded.id
    next()
  })
}

checkDuplicateUsernameOrEmail = (req, res, next) => {
  const { username, email } = req.body

  User.findOne({
    username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    if (user) {
      res.status(400).send({ message: 'Username already in use!' })
      return
    }

    User.findOne({
      email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      if (user) {
        res.status(400).send({ message: 'Email is already in use!' })
        return
      }
      next()
    })
  })
}

module.exports = {
  checkDuplicateUsernameOrEmail,
  verifyToken
}
