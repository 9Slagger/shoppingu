const db = require('../models')
module.exports = {
  getProductType: async (req, res, next) => {
    let productTypeResult, result, messages, status
    try {
      productTypeResult = await db.ProductTypeModel.findAll({ raw: true })
      result = productTypeResult
      status = 200
      messages = ['get product type success']
    } catch (error) {
      messages = ['someting wrong']
      status = 400
      result = error
    }
    res.status(status).json({ result, messages })
  }
}
