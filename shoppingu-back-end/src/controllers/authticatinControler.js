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
        include: [{ model: db.RoleModel }],
        raw: true
      })
      if (!_.isEmpty(userResult)) {
        if (compare(req.body.password, userResult.password)) {
          result = {}
          result.token = getToken({
            id: userResult.id,
            email: userResult.email,
            role: userResult['role.role_code'],
            phoneNumber: userResult.phone_number,
            firstName: userResult.first_name,
            lastName: userResult.last_name,
            profileImage:
              userResult.profileImage ||
              'https://images.unsplash.com/photo-1533518463841-d62e1fc91373?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80'
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
