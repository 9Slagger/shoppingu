var jwt = require('jsonwebtoken')
const _ = require('lodash')
const secretKey = process.env.SECRET_KEY || 'key1234'

const getToken = obj => {
  return jwt.sign(obj, secretKey, {
    expiresIn: 86400 * 365 // 86400 sec = 24 hours
  })
}

const verifyToken = (req, res, next) => {
  var token = req.headers['x-access-token']
  if (_.isEmpty(token)) {
    return res.status(403).send({ message: ['no token provided.'] })
  }
  jwt.verify(token, secretKey, (error, decoded) => {
    if (!_.isEmpty(error)) {
      return res
        .status(400)
        .send({ message: ['Failed to authenticate token.'] })
    } else {
      req.user.username = decoded.username
      req.user.id = decoded.id
      req.user.type = decoded.type
      next()
    }
  })
}

module.exports = { getToken, verifyToken }
