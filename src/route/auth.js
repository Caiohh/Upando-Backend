const auth = require('../controller/auth')
const { checkDuplicateUsernameOrEmail, verifyToken } = require('../hook/auth')
const schema = require('../schema/customer')

module.exports = route
