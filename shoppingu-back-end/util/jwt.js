var jwt = require('jsonwebtoken')
const _ = require('lodash')
const secretKey = process.env.SECRET_KEY || 'key1234'

const getToken = obj => {
  return jwt.sign(obj, secretKey, {
    expiresIn: 86400 * 365 // 86400 sec = 24 hours
  })
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  if (_.isEmpty(token)) {
    return res.status(403).send({ messages: ['no token provided.'] })
  }
  jwt.verify(token, secretKey, (error, decoded) => {
    if (!_.isEmpty(error)) {
      console.log(token)
      return res
        .status(400)
        .send({ messages: ['Failed to authenticate token.'] })
    } else {
      req.user = {}
      req.user.id = decoded.id
      req.user.email = decoded.email
      req.user.role = decoded.role
      next()
    }
  })
}

module.exports = { getToken, verifyToken }
