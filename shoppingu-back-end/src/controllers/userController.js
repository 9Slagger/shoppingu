const db = require('../models')
const { hash } = require('../../util/bcrypt')

module.exports = {
  getUser: async (req, res, next) => {
    let userResult, result
    try {
      userResult = await db.UserModel.findAll()
      result = userResult
    } catch (error) {
      result = error
    }
    return res.status(200).json({ result, messages: [] })
  },
  createUser: async (req, res, next) => {
    let userTypeResult, userResult, result, messages
    try {
      userTypeResult = await db.UserTypeModel.findOne({
        where: { type_code: '02CM' }
      })
      try {
        const { year, month, date } = req.body.birthday
        userResult = await db.UserModel.create({
          email: req.body.email,
          password: hash(req.body.password),
          phone_number: req.body.phoneNumber,
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          birthday: new Date(year, month, date),
          userTypeId: userTypeResult.id
        })
        result = userResult
        return res.status(200).json({ result, messages })
      } catch (error) {
        result = error
        messages = ['cannot register']
        return res.status(200).json({ result, messages })
      }
    } catch (error) {
      messages = ['cannot register']
      console.log('error', error)
      return res.status(200).json({ result, messages })
    }
  }
}
