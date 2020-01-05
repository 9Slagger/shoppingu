const db = require('../models')
const { compare } = require('../../util/bcrypt')
const { getToken } = require('../../util/jwt')
const _ = require('lodash')

module.exports = {
  signup: async (req, res, next) => {
    let userResult, result
    try {
      userResult = await db.UserModel.findOne({
        where: { email: req.body.email },
        raw: true
      })
      if (!_.isEmpty(userResult)) {
        if (compare(req.body.password, userResult.password)) {
          result = {}
          result.token = getToken({
            id: userResult.id,
            email: userResult.email,
            role: userResult.role || '02CM'
          })
          return res.status(200).json({ result, messages: ['signin success'] })
        }
      }
      return res.status(400).json({ result, messages: ['invalid password'] })
    } catch (error) {
      result = error
      return res.status(400).json({ result, messages: ['someting worng'] })
    }
  }
}
