const db = require('../models')

module.exports = {
  getStoreType: async (req, res, next) => {
    let StoreTypeResult, result, messages, status
    try {
      StoreTypeResult = await db.StoreTypeModel.findAll({
        attributes: ['store_type_name', 'store_type_code'],
        raw: true
      })
      result = StoreTypeResult
      messages = []
      status = 200
    } catch (error) {
      result = error
      messages = ['someting is wrong']
      status = 400
    }
    res.status(status).json({ result, messages })
  }
}
