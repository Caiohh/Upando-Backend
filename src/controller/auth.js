const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/auth.config')
const User = require('../schema/user')

const signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    res.send({ message: 'User was registered successfully!' })
  })
}

const signin = (req, res) => {
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) return res.status(500).send({ message: err })

    if (!user) return res.status(404).send({ message: 'User Not found.' })

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

    if (!passwordIsValid) return res.status(401).send({ message: 'Invalid Password!' })

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    })

    req.session.token = token
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email
    })
  })
}

const signout = async (req, res) => {
  try {
    req.session = null
    return res.status(200).send({ message: "You've been signed out!" })
  } catch (err) {
    this.next(err)
  }
}

module.exports = {
  signin,
  signout,
  signup
}
