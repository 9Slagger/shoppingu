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
    let transaction, userTypeResult, userResult, result, messages, status
    try {
      transaction = await db.sequelize.transaction()
      try {
        userTypeResult = await db.RoleModel.findOne({
          where: { role_code: '02CM' }
        })
        try {
          const { year, month, date } = req.body.birthday
          userResult = await db.UserModel.create(
            {
              email: req.body.email,
              password: hash(req.body.password),
              phone_number: req.body.phoneNumber,
              first_name: req.body.firstName,
              last_name: req.body.lastName,
              birthday: new Date(year, month, date),
              roleId: userTypeResult.id
            },
            { transaction }
          )
          result = userResult
          messages = ['sign up success']
          status = 201
          try {
            await db.CartModel.create({ userId: userResult.id }, {transaction})
            console.log('debug')
            await transaction.commit()
          } catch (error) {
            await transaction.rollback()
            result = error
            messages = ['someting is wrong']
            status = 400
          }
          return res.status(status).json({ result, messages })
        } catch (error) {
          await transaction.rollback()
          result = error
          messages = ['someting is wrong']
          status = 400
          return res.status(status).json({ result, messages })
        }
      } catch (error) {
        await transaction.rollback()
        result = error
        messages = ['someting is wrong']
        status = 400
        return res.status(status).json({ result, messages })
      }
    } catch (error) {
      await transaction.rollback()
      result = error
      status = 400
      messages = ['someting is wrong']
    }
    res.status(status).json({ result, messages })
  }
}
